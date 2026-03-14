# 🚀 Dtul Backend — Complete Setup & Guide

**Status:** READY FOR TESTING  
**Tech Stack:** Bun | TypeScript | Node.js | Google Sheets API | Gmail/Nodemailer | Stripe  
**Cost:** 100% FREE (except payment processing fees)

---

## 📚 Documentation

This backend has **3 complete guides:**

| Guide | Purpose | Read Time |
|-------|---------|-----------|
| **[BACKEND-SETUP.md](./BACKEND-SETUP.md)** | Detailed setup for Google Sheets, Gmail, Stripe | 20 min |
| **[TESTING-GUIDE.md](./TESTING-GUIDE.md)** | How to test locally with curl/browser | 10 min |
| **[INTEGRATION-MAP.md](./INTEGRATION-MAP.md)** | Visual data flow & architecture explanation | 15 min |

**Start here:** [TESTING-GUIDE.md](./TESTING-GUIDE.md) for quick local testing

---

## ⚡ 5-Minute Quick Start

### 1. Setup .env file

Create `backend/.env`:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=your-notification-email@gmail.com
STRIPE_SECRET_KEY=sk_test_51KmL2n...
STRIPE_PUBLISHABLE_KEY=pk_test_51KmL2n...
PORT=3001
```

### 2. Start Backend

```bash
cd backend
bun dev
```

Output: `Backend server running on http://localhost:3001`

### 3. Start Frontend (NEW TERMINAL)

```bash
cd dtul_-the-architect's-breakout
bun run dev
```

### 4. Test Contact Form

1. Go to `http://localhost:5173/D-tul/first-contact`
2. Fill form and click "Send Message"
3. Check:
   - ✓ Browser shows success
   - ✓ You receive admin email
   - ✓ User receives confirmation email
   - ✓ Google Sheet has new row

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    YOUR DTUL WEBSITE                    │
│  (React + Vite + Three.js + Brutalist Styling)         │
│  └─ components/Contact.tsx (Contact form UI)           │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTP POST
                       ▼
┌─────────────────────────────────────────────────────────┐
│              BUN BACKEND SERVER (3001)                  │
│  ├─ /api/contact → handleContactForm()                 │
│  ├─ /api/payment → handlePaymentIntent()               │
│  └─ /api/product → handleProductDelivery()             │
└──────────────────┬──────────────────┬──────────────────┘
                   │                  │
        ┌──────────┼──────────┐       │
        │          │          │       │
        ▼          ▼          ▼       ▼
   ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
   │ Google │ │ Gmail  │ │Stripe  │ │ Your   │
   │Sheets  │ │SMTP    │ │API     │ │Inbox   │
   │(DB)    │ │(Email) │ │(Pay)   │ │(Email) │
   └────────┘ └────────┘ └────────┘ └────────┘

COST: $0 + 2.9% per payment
```

---

## 📁 File Structure

```
backend/
├── server.ts                    # HTTP server & routing
├── handlers/
│   ├── contact.ts              # Contact form logic
│   ├── payment.ts              # Payment intent creation
│   └── product.ts              # Product delivery
├── .env                         # Credentials (NEVER commit!)
├── .env.example                 # Template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
│
├── BACKEND-SETUP.md            # Full setup guide
├── TESTING-GUIDE.md            # How to test
├── INTEGRATION-MAP.md          # Data flow diagram
└── README.md                    # This file
```

---

## 🔌 API Endpoints

### POST /api/contact
**Contact form submission**

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "service": "development",
    "message": "Build me a backend"
  }'
```

**Response:** `{"success": true, "message": "Contact saved"}`

**What happens:**
1. Save to Google Sheets
2. Send admin notification email
3. Send confirmation email to user

---

### POST /api/payment
**Create Stripe payment intent**

```bash
curl -X POST http://localhost:3001/api/payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.99,
    "currency": "usd",
    "productId": "pro-plan"
  }'
```

**Response:** `{"clientSecret": "pi_....", "id": "pi_1234567"}`

**What it does:**
- Use `clientSecret` with Stripe.js in frontend for payment UI

---

### POST /api/product
**Deliver product after payment**

```bash
curl -X POST http://localhost:3001/api/product \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_1234567",
    "email": "customer@example.com"
  }'
```

**Response:** `{"success": true}`

**What happens:**
1. Verify payment succeeded with Stripe
2. Send product delivery email
3. (Future: provide download link)

---

## 🔑 Environment Variables

See [BACKEND-SETUP.md - Part 2](./BACKEND-SETUP.md#part-2-setup-instructions-step-by-step) for detailed setup instructions.

Quick reference:

| Variable | Purpose | Example |
|----------|---------|---------|
| `GOOGLE_CLIENT_EMAIL` | Service account email | dtul-sheets@project.iam.gserviceaccount.com |
| `GOOGLE_PRIVATE_KEY` | Authentication key | "-----BEGIN PRIVATE KEY-----..." |
| `GOOGLE_SHEET_ID` | Where to save submissions | 1a2b3c4d5e6f7g8h9i0j |
| `EMAIL_USER` | Gmail address for sending | your-email@gmail.com |
| `EMAIL_PASS` | App password (not regular password!) | xxxx xxxx xxxx xxxx |
| `NOTIFICATION_EMAIL` | Where admin gets notified | admin@dtul.com |
| `STRIPE_SECRET_KEY` | Stripe secret (backend only!) | sk_test_51KmL2n... |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public (can share) | pk_test_51KmL2n... |
| `PORT` | Server port | 3001 |

---

## 🚀 Getting Started Guide

### Step 1: Choose Your Path

**Path A: Just contact form** (fastest, 10 min setup)
- Allow people to contact you
- Nothing requires payment
- Perfect for initial launch

**Path B: Full backend** (20 min setup)
- Contact form + Payment processing
- Sell digital products
- More complex integration

### Step 2: Follow Setup Guide

1. **Read** [BACKEND-SETUP.md](./BACKEND-SETUP.md)
   - Part A: Google Sheets setup
   - Part B: Gmail setup
   - Part C: Stripe setup (optional)

2. **Create .env file** with credentials

3. **Test locally** using [TESTING-GUIDE.md](./TESTING-GUIDE.md)

### Step 3: Deploy When Ready

**Free hosting options:**
- Railway (recommended)
- Replit
- Heroku (limited free tier)
- Self-hosted (cloud VM)

---

## 📋 Checklist

### Setup Phase
- [ ] Google Sheets API enabled
- [ ] Service account created
- [ ] Gmail app password generated
- [ ] Stripe test keys created (optional)
- [ ] .env file created with all variables
- [ ] .env added to .gitignore

### Testing Phase
- [ ] Backend starts without errors
- [ ] Contact form submits from frontend
- [ ] Admin notification email arrives
- [ ] User confirmation email arrives
- [ ] Google Sheet has new row
- [ ] All data is correct

### Deployment Phase
- [ ] Deploy backend to hosting platform
- [ ] Update frontend API endpoint (prod URL instead of localhost:3001)
- [ ] Test on production
- [ ] Setup error monitoring
- [ ] Backup Google Sheet regularly

---

## 🆘 Troubleshooting

### Backend won't start
```
Error: Cannot find 'bun'
→ Install Bun: curl https://bun.sh/install | bash

Error: ENOENT .env
→ Create .env file in backend folder

Error: Cannot parse private key
→ Check GOOGLE_PRIVATE_KEY formatting in .env
```

### Form not submitting
```
Network error
→ Is backend running? (bun dev)
→ Is CORS configured? (check server.ts)
→ Backend & frontend on same machine? (localhost)

Frontend sends success but no email
→ Check EMAIL_USER and EMAIL_PASS
→ Verify app password was generated (not regular password)
→ Check backend logs for error
```

### Email not arriving
```
Email never comes
→ 1. Check app password is correct
   2. Check 2-factor auth is enabled
   3. Check NOTIFICATION_EMAIL is correct
   4. Check spam folder
   5. Regenerate app password

Gmail "Account locked" error
→ Go to https://accounts.google.com/login/device
   → Unlock account
   → Try again
```

### Sheets not updating
```
Sheet stays empty
→ 1. Check GOOGLE_SHEET_ID is correct
   2. Verify sheet is shared with service account
   3. Check column headers exist (A: timestamp, etc.)
   4. Backend logs show successful append? If not, check error
```

See [TESTING-GUIDE.md - Troubleshooting](./TESTING-GUIDE.md#-troubleshooting) for more.

---

## 📊 Free vs Paid

### Free tier includes:
✅ Contact form submission  
✅ Email notifications  
✅ Google Sheets storage  
✅ Unlimited contacts per month  
✅ Test payment processing  

### Costs:
- **Contact Form:** $0 (fully free)
- **Email:** $0 (uses your Gmail)
- **Storage:** $0 (Google Sheets)
- **Payments:** 2.9% + $0.30 per successful charge (Stripe)

**Example:**
- 1000 contact form submissions: $0
- 100 successful $99 charges: (100 × 99 × 0.029) + (100 × 0.30) = $287 + $30 = $317
- Profit: $9,900 - $317 = $9,583 🎉

---

## 🔐 Security Practices

### ✅ DO
- Store .env in `.gitignore`
- Use app passwords for Gmail
- Rotate credentials yearly
- Monitor Stripe dashboard for fraud
- Log errors for debugging
- Validate all inputs

### ❌ DON'T
- Commit .env to git
- Expose STRIPE_SECRET_KEY in frontend
- Hardcode credentials in code
- Log sensitive data (passwords, keys)
- Use regular Gmail password (use app password)
- Skip input validation

### When deployed to production:
```typescript
// Update CORS to your domain only
const corsHeaders = {
  "Access-Control-Allow-Origin": "https://yoursite.com",
  // not "*" or localhost
};

// Add API rate limiting
// Add request logging
// Add error tracking (Sentry, etc.)
```

---

## 🎯 Common Tasks

### Add a new email recipient

```typescript
// In handlers/contact.ts, after line that sends admin email:
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "another-person@example.com",  // ADD THIS
  subject: "CC: Another person",
  text: "...",
});
```

### Change form field names

1. Update Contact.tsx form labels
2. Update contact.ts validation
3. Update Google Sheet headers
4.Update email template in contact.ts

### Add payment success page

```typescript
// In frontend, after payment succeeds:
navigate('/payment-success?id=' + paymentIntentId);

// Create new page: pages/PaymentSuccess.tsx
// Show order details, download link, etc.
```

### Send product download link

```typescript
// In handlers/product.ts:
const downloadLink = `https://yoursite.com/downloads/${productId}`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: "Your Product Download",
  text: `Download here: ${downloadLink}`,
});
```

---

## 📈 Next Steps

**Phase 1: Local Testing** ← YOU ARE HERE
- [ ] Complete setup from [BACKEND-SETUP.md](./BACKEND-SETUP.md)
- [ ] Follow [TESTING-GUIDE.md](./TESTING-GUIDE.md)

**Phase 2: Production Deployment**
- [ ] Deploy backend to Railway or similar
- [ ] Update frontend API endpoints
- [ ] Test on production domain

**Phase 3: Advanced Features**
- [ ] Stripe webhook for automatic receipts
- [ ] Admin dashboard to view submissions
- [ ] Email template builder
- [ ] Recurring payments / subscriptions

**Phase 4: Scale & Monitor**
- [ ] Setup error logging (Sentry)
- [ ] Monitor email deliverability
- [ ] Track payment success rate
- [ ] Regular Google Sheet backups

---

## 💡 Pro Tips

1. **Save Stripe test transactions:**
   - Dashboard → Payments → See all test payments
   - Use failed card to test error handling

2. **Backup your Google Sheet:**
   - File → Download → CSV before deploying
   - Set up automatic backup to Drive

3. **Monitor email delivery:**
   - Check Gmail Sent folder for bounces
   - Setup email forwarding for alerts

4. **Debug form submissions:**
   - Frontend: Browser DevTools → Network tab
   - Backend: Check console logs while form submits
   - Email: Check NOTIFICATION_EMAIL for errors

---

## 🎓 What You've Built

✅ **Full contact form system**
- Frontend (React) with validation
- Backend (Bun) with routing
- Email notifications (Gmail)
- Permanent storage (Google Sheets)
- 100% free

✅ **Payment infrastructure** (when added)
- Stripe payment processing
- Product delivery automation
- Transaction verification

✅ **Professional architecture**
- Modular handlers
- Error handling
- CORS security
- TypeScript types

---

## 📞 Support

**Questions about:**
- **Setup?** → See [BACKEND-SETUP.md](./BACKEND-SETUP.md)
- **Testing?** → See [TESTING-GUIDE.md](./TESTING-GUIDE.md)
- **How it works?** → See [INTEGRATION-MAP.md](./INTEGRATION-MAP.md)
- **API?** → Check server.ts and handlers/
- **Errors?** → Check console logs and troubleshooting guide

---

## 📝 Files You Created

| File | Purpose | Size |
|------|---------|------|
| Contact.tsx | Frontend form component | 400 lines |
| server.ts | HTTP server & routing | 45 lines |
| handlers/contact.ts | Contact handler | 65 lines |
| handlers/payment.ts | Payment handler | 35 lines |
| handlers/product.ts | Product delivery handler | 40 lines |
| BACKEND-SETUP.md | Complete setup guide | 600 lines |
| TESTING-GUIDE.md | Testing guide | 500 lines |
| INTEGRATION-MAP.md | Architecture diagram | 400 lines |
| This README | Quick reference | 400 lines |

**Total: ~2,500 lines of code + documentation**

---

**🎉 Ready to test? Follow [TESTING-GUIDE.md](./TESTING-GUIDE.md) now!**

*Last update: 2026-03-13*  
*Backend v1.0 - Production Ready*
