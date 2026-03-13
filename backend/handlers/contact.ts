import { google } from "googleapis";
import nodemailer from "nodemailer";

// Google Sheets setup
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const RANGE = "Sheet1!A:E"; // Adjust columns as needed

async function appendToSheet(values: string[]) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: RANGE,
    valueInputOption: "RAW",
    requestBody: { values: [values] },
  });
}

// Email setup
const transporter = nodemailer.createTransporter({
  service: "gmail", // or your SMTP
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function handleContactForm(req: Request, corsHeaders: Record<string, string>) {
  const body = await req.json();
  const { name, email, service, message } = body;

  // Validate
  if (!name || !email || !service) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Save to Google Sheets
    const timestamp = new Date().toISOString();
    await appendToSheet([timestamp, name, email, service, message || ""]);

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for your inquiry",
      text: `Hi ${name},\n\nThank you for reaching out. We'll get back to you soon about ${service}.\n\nBest,\nDTUL Team`,
    });

    // Send notification to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL!,
      subject: "New Contact Form Submission",
      text: `New inquiry:\nName: ${name}\nEmail: ${email}\nService: ${service}\nMessage: ${message}`,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return new Response(JSON.stringify({ error: "Failed to process form" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}