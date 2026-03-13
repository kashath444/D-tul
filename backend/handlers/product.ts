import nodemailer from "nodemailer";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

export async function handleProductDelivery(req: Request, corsHeaders: Record<string, string>) {
  const body = await req.json();
  const { paymentIntentId, email } = body;

  if (!paymentIntentId || !email) {
    return new Response(JSON.stringify({ error: "Missing payment or email" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    // Verify payment was successful
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return new Response(JSON.stringify({ error: "Payment not completed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send product email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your DTUL Product",
      text: "Thank you for your purchase! Here is your product...\n\n[Attach or link to product]",
      // attachments: [{ filename: "product.pdf", path: "/path/to/product.pdf" }]
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Product delivery error:", error);
    return new Response(JSON.stringify({ error: "Failed to deliver product" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}