# Dtul Backend Setup Guide
## Complete Free API Integration (100% Free Tier)

**Status:** In Development  
**Stack:** Bun + TypeScript + Nodemailer + Google Sheets + Stripe (free)  
**Architecture:** Event-driven, serverless-friendly, zero hosting costs

---

## Architecture Overview

```
┌─────────────────┐
│   Frontend      │
│  (React + Vite) │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────────────────────┐
│   Bun Server (localhost:3001)   │
├─────────────────────────────────┤
│  ┌────────────────────────────┐ │
│  │  /api/contact (POST)       │ │
│  │  - Validate form data      │ │
│  │  - Save to Google Sheets   │ │
│  │  - Send notification email │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌────────────────────────────┐ │
│  │  /api/payment (POST)       │ │
│  │  - Create Stripe intent    │ │
│  │  - Return client secret    │ │
│  └────────────────────────────┘ │
│                                 │
│  ┌────────────────────────────┐ │
│  │  /api/product (POST)       │ │
│  │  - Verify payment          │ │
│  │  - Send delivery email     │ │
│  │  - Initialize DL          │ │
│  └────────────────────────────┘ │
└────────┬────────────────────────┘
         │
    ┌────┴────┬─────────┬────────┐
    ▼         ▼         ▼        ▼
┌────────┐ ┌──────┐ ┌────────┐ ┌─────┐
│ Gmail  │ │Google│ │ Stripe │ │ DB? │
│SMTP    │ │Sheets│ │ Webhook│ │No   │
└────────┘ └──────┘ └────────┘ └─────┘
(email)   (storage) (payments) (sheet=db)
```

---

## Part 1: Free APIs You're Using

### 1. **Google Sheets API** (FREE)
- **Purpose:** Store contact submissions permanently
- **Limit:** 300 concurrent requests, 60 requests per minute (perfect for small volume)
- **Cost:** $0 (free tier, unlimited for your use case)
- **Setup:** Service account authentication

### 2. **Google Gmail API** via Nodemailer (FREE)
- **Purpose:** Send notification emails automatically
- **Method:** App passwords (no 3rd party email service needed)
- **Cost:** $0 (runs on your Gmail account)
- **Uses:** SMTP protocol (built into Nodemailer)

### 3. **Stripe** (FREE + TRANSACTION FEES)
- **Purpose:** Payment processing for digital products
- **Free Features:** 
  - Test mode endpoints (sandbox testing)
  - Payment Intent API (charge processing)
  - Webhook events (payment confirmations)
- **Cost:** 2.9% + $0.30 per successful charge (standard payment processing fee)
- **Limit:** No request limits on free tier

### 4. **No Database Needed**
- **Google Sheets is your database** (no SQL server needed)
- Contact submissions stored as rows
- Cost: $0 (uses free tier of Sheets API)

---

## Part 2: Setup Instructions (Step by Step)

### Step A: Google Sheets Setup (For Contact Storage)

**1. Create Google Cloud Project**
```
1. Go to: console.cloud.google.com
2. Click "Create Project"
3. Name: "dtul-backend"
4. Wait for creation (~1 min)
```

**2. Enable Sheets API**
```
1. Go to APIs & Services → Library
2. Search "Google Sheets API"
3. Click Enable
4. Do the same for "Google Drive API" (needed for Sheets)
```

**3. Create Service Account**
```
1. Go to APIs & Services → Credentials
2. Click "Create Credentials" → "Service Account"
3. Service account name: "dtul-sheets"
4. Continue (skip optional steps)
5. Go to "Keys" tab
6. Click "Add Key" → "Create new key" → "JSON"
7. Save the JSON file (keep it SAFE!)
```

**4. Create Google Sheet for Contacts**
```
1. Go to sheets.google.com
2. New spreadsheet: "Dtul Contacts"
3. Rename "Sheet1" to "Sheet1"
4. Add headers (Row 1):
   - A: timestamp
   - B: name
   - C: email
   - D: service
   - E: message
5. Share sheet with service account email (from JSON)
   - Right-click → Share → Add the service account email
   - Make sure it has Editor access
```

**5. Extract Credentials for .env**
From the JSON key you downloaded:
```
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=get-from-sheet-url (middle part)
```

---

### Step B: Gmail Setup (For Sending Emails)

**1. Enable 2-Factor Authentication**
```
1. Go to: myaccount.google.com/security
2. Enable "2-Step Verification"
```

**2. Create App Password**
```
1. Go to: myaccount.google.com/apppasswords
2. Select "Mail" and "Windows Computer" (or your OS)
3. Generate password (16 characters)
4. Copy it immediately
```

**3. Add to .env**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  (16-char app password from above)
NOTIFICATION_EMAIL=your-email@gmail.com  (where to send notifications)
```

---

### Step C: Stripe Setup (For Payments)

**1. Create Free Stripe Account**
```
1. Go to: stripe.com
2. Click "Start now"
3. Fill in email, password, country
4. Verify email
5. Enable "Use test data" toggle at top
```

**2. Get Test API Keys**
```
1. Go to: Developers → API Keys
2. Copy "Secret key" starting with sk_test_...
3. Copy "Publishable key" starting with pk_test_...
```

**3. Add to .env**
```
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

**4. Save Test Card Info (for testing)**
```
Card: 4242 4242 4242 4242
Exp: Any future date (e.g., 12/26)
CVC: Any 3 digits (e.g., 123)
```

---

## Part 3: Complete Contact Handler Implementation

### Current Status
Your contact.ts is partially done. Here's the **complete implementation**:

```typescript
// backend/handlers/contact.ts
import { google } from "googleapis";
import nodemailer from "nodemailer";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const RANGE = "Sheet1!A:E";

// ===== Google Sheets =====
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

// ===== Email Setup =====
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
});

// ===== Handler =====
export async function handleContactForm(
  req: Request,
  corsHeaders: Record<string, string>
) {
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    // Validate required fields
    if (!name || !email || !service || !message) {
      return new Response(
        JSON.stringify({ error: "All fields required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to Google Sheets
    const timestamp = new Date().toISOString();
    await appendToSheet([timestamp, name, email, service, message]);

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Contact: ${name} - ${service}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p><small>Submitted: ${timestamp}</small></p>
      `,
    });

    // Send confirmation to submitter
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We got your message",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out. We'll get back to you soon.</p>
        <p>— The Dtul Team</p>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: "Contact saved" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Contact handler error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process contact" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
}
```

---

## Part 4: Frontend Contact Form (React Component)

### Current Contact Component Refactor

Replace your Contact.tsx with this complete implementation:

```typescript
// components/Contact.tsx
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '80px 20px',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent 50%, rgba(74, 4, 4, 0.05) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scanline-scroll 8s linear infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          width: '100%',
          height: '2px',
          background: 'rgba(74, 4, 4, 0.2)',
          boxShadow: '0 0 10px rgba(74, 4, 4, 0.1)',
          animation: 'sweep-pass 10s linear infinite'
        }} />
      </div>

      {/* Content Container */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(40px, 8vw, 80px)'
      }}>
        {/* Headline */}
        <div style={{ textAlign: 'left' }}>
          <h2 className="heading" style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#fff',
            lineHeight: '1.1',
            marginBottom: '30px'
          }}>
            got something worth building?<br />
            skip the small talk.
            <span style={{
              display: 'inline-block',
              width: '0.6em',
              height: '0.1em',
              backgroundColor: 'var(--deep-crimson)',
              marginLeft: '10px',
              verticalAlign: 'middle',
              animation: 'blink-cursor 1s step-end infinite'
            }} />
          </h2>
          <p className="mono" style={{
            color: '#888',
            fontSize: 'clamp(14px, 2vw, 18px)',
            lineHeight: '1.6',
            maxWidth: '600px',
            borderLeft: '2px solid var(--deep-crimson)',
            paddingLeft: '20px'
          }}>
            whether it's a bold product idea or something broken that needs fixing - send the raw details. we'll handle the rest.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '600px'
        }}>
          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid rgba(74, 4, 4, 0.3)',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--deep-crimson)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.3)'}
            />
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid rgba(74, 4, 4, 0.3)',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--deep-crimson)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.3)'}
            />
          </div>

          {/* Service Type */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              What do you need?
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid rgba(74, 4, 4, 0.3)',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'border-color 0.2s',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--deep-crimson)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.3)'}
            >
              <option value="">-- Select Service --</option>
              <option value="architecture">System Architecture</option>
              <option value="development">Full-Stack Development</option>
              <option value="design">Design + Frontend</option>
              <option value="research">Research + Analysis</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label className="mono" style={{
              color: '#888',
              fontSize: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              style={{
                padding: '12px',
                fontSize: '16px',
                border: '1px solid rgba(74, 4, 4, 0.3)',
                borderRadius: '2px',
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                color: '#fff',
                fontFamily: 'monospace',
                transition: 'border-color 0.2s',
                resize: 'vertical'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--deep-crimson)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(74, 4, 4, 0.3)'}
            />
          </div>

          {/* Status Messages */}
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(139, 0, 0, 0.2)',
              border: '1px solid #8B0000',
              color: '#ff6b6b',
              borderRadius: '2px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(34, 139, 34, 0.2)',
              border: '1px solid #228B22',
              color: '#90EE90',
              borderRadius: '2px',
              fontSize: '14px'
            }}>
              ✓ Message received. We'll get back to you soon.
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              border: '2px solid var(--deep-crimson)',
              backgroundColor: loading ? 'rgba(74, 4, 4, 0.2)' : 'transparent',
              color: 'var(--deep-crimson)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = 'rgba(74, 4, 4, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
```

---

## Part 5: How Everything Connects (Data Flow)

### Flow 1: Contact Form Submission

```
1. User fills form in browser
   ↓
2. React component validates (name, email, service, message)
   ↓
3. POST to http://localhost:3001/api/contact
   ↓ Server receives, validates
4. Extracts: name, email, service, message
   ↓
5. Appends row to Google Sheet with timestamp
   ├─ Column A: timestamp (2024-03-13T10:25:30Z)
   ├─ Column B: name (John Doe)
   ├─ Column C: email (john@example.com)
   ├─ Column D: service (development)
   └─ Column E: message (Build me an app...)
   ↓
6. Sends email to you (admin notification)
   └─ Subject: "New Contact: John Doe - development"
   ↓
7. Sends confirmation email to user
   └─ Subject: "We got your message"
   ↓
8. Returns {"success": true} to browser
   ↓
9. React shows success message, clears form
```

---

## Part 6: Running the Backend Locally

### Terminal 1: Start Backend Server
```bash
cd backend
bun dev
```
Output:
```
Backend server running on http://localhost:3001
```

### Terminal 2: Start Frontend
```bash
cd ..
bun run dev
```
Output:
```
VITE v6.2.0  ready in 234 ms

➜  Local:   http://localhost:5173/D-tul
```

### Test Contact Form Locally
1. Go to `http://localhost:5173/D-tul/first-contact`
2. Fill form with test data:
   - Name: "Test User"
   - Email: "test@gmail.com"
   - Service: "development"
   - Message: "This is a test"
3. Click "Send Message"
4. Check:
   - ✓ Browser shows success message
   - ✓ You receive admin notification email
   - ✓ User receives confirmation email
   - ✓ Google Sheet has new row with all data

---

## Part 7: Testing Payment Flow (When Ready)

```typescript
// Simple payment test
const response = await fetch('http://localhost:3001/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    amount: 99,  // $99
    currency: 'usd',
    productId: 'pro-plan'
  })
});

const { clientSecret, id } = await response.json();
// Use clientSecret with Stripe.js to complete payment
```

**Test with Stripe card:**
- Card: `4242 4242 4242 4242`
- Exp: `04/26`
- CVC: `424`

---

## Part 8: Environment Setup (.env File)

Create `.env` file in `/backend` directory:

```env
# Google APIs
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j

# Gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=your-notification-email@gmail.com

# Stripe
STRIPE_SECRET_KEY=sk_test_51KmL2nxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_51KmL2nxxxxxx

# Server
PORT=3001
```

**Getting Private Key from JSON (formatting is tricky):**
```
Original in JSON: "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBA..."

In .env: GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA..."
```

---

## Part 9: Troubleshooting

### Problem: "Missing required fields"
**Solution:** Make sure form has name, email, service, AND message

### Problem: "Invalid email format"
**Solution:** Verify user entered valid email (has @ and .)

### Problem: "Sheets error"
**Solution:** 
- Check GOOGLE_SHEET_ID is correct
- Verify service account has Editor access to sheet
- Ensure you shared the sheet with service account email

### Problem: "Email not sending"
**Solution:**
- Verify EMAIL_PASS is App Password (not regular password)
- 2-factor authentication is enabled
- EMAIL_USER matches Gmail account where app password was created

### Problem: "CORS error"
**Solution:** When deployed, update CORS headers:
```typescript
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://your-domain.com",
  // ... rest
};
```

---

## Part 10: Deployment (When Ready)

### Free Hosting Options:

**Option A: Railway (Recommended)**
- Deploy Bun server easily
- Free tier: generous limits
- Copy `.env` vars into Railway dashboard

**Option B: Replit**
- Free Node.js hosting
- Import GitHub repo
- Runs 24/7 on free tier

**Option C: Vercel (Functions Only)**
- Free serverless functions
- Deploy contact handler as function
- Limited to 60-second executions

---

## Summary: What's Free Here?

| Component | Service | Cost |
|-----------|---------|------|
| Backend Server | Bun | FREE |
| Contact Storage | Google Sheets API | FREE (300 req/min) |
| Email Sending | Gmail App Password | FREE |
| Email Delivery | Nodemailer | FREE |
| Payment Processing | Stripe | 2.9% + $0.30 per charge |
| Test Cards | Stripe Test Mode | FREE |
| Hosting | Your computer or Railway | FREE or cheap ($5-10/mo) |
| Database | Google Sheets | FREE (replaces SQL DB) |
| **Total:** | | **~$0 (+ payment fees when you earn)** |

---

## Next Steps

1. ✅ Follow Setup Instructions (Parts A-C)
2. ✅ Update `.env` with your credentials
3. ✅ Test backend locally (`bun dev` in backend folder)
4. ✅ Test form submission
5. ✅ Verify emails arrive
6. ✅ Check Google Sheet for entry

---

*Last Updated: 2026-03-13*  
*Backend Implementation Guide v1.0*
