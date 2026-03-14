# Dtul Backend - Integration Map

**What's Connected? How Does Data Flow?**

---

## 🔗 The Complete Data Flow

### 1. Contact Form Submission

```
┌─────────────────────────────────────────────────────────────────┐
│ USER FILLS FORM IN BROWSER (React Component)                   │
│ • Name: "John"                                                   │
│ • Email: "john@example.com"                                     │
│ • Service: "development"                                         │
│ • Message: "Build me an API"                                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │ User clicks "Send Message"
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ CONTACT.TSX COMPONENT (Frontend)                               │
│ • Validates form data                                           │
│ • Shows loading spinner                                         │
│ • POST to http://localhost:3001/api/contact                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │ HTTPS Request with JSON body
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ BUN SERVER (http://localhost:3001)                              │
│ • Receives request on /api/contact route                        │
│ • Calls handleContactForm() from ./handlers/contact.ts         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   ┌────────┐  ┌───────────────┐  ┌──────────────────┐
   │Validate│  │Save to Google │  │Send Emails       │
   │Data    │  │Sheets (DB)    │  │(Gmail/Nodemailer)│
   └────────┘  └───────────────┘  └──────────────────┘
        │              │              │
        │              ▼              │
        │     ┌──────────────────┐    │
        │     │GOOGLE SHEETS API │    │
        │     ├──────────────────┤    │
        │     │ Authenticated    │    │
        │     │ with service     │    │
        │     │ account         │    │
        │     └──────────────────┘    │
        │              │              │
        │              ▼              │
        │     ┌──────────────────┐    │
        │     │Your Google Sheet │    │
        │     ├──────────────────┤    │
        │     │Row: 2024-03-13... │    │
        │     │      John        │    │
        │     │      john@...    │    │
        │     │      development │    │
        │     │      Build me... │    │
        │     └──────────────────┘    │
        │              │              │
        └──────────────┼──────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │   RESPONSE TO BROWSER        │
        ├──────────────────────────────┤
        │ {"success": true,            │
        │  "message": "Contact saved"} │
        └──────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────┐
        │ CONTACT.TSX UPDATES UI       │
        ├──────────────────────────────┤
        │ ✓ Show success message       │
        │ ✓ Clear form fields          │
        │ ✓ Hide loading spinner       │
        └──────────────────────────────┘
```

---

## 📧 Email Flow

### Send Notifications (Same Time as Form Submission)

```
HANDLER: handleContactForm()
  │
  ├─1. Append to Google Sheets ✓
  │
  ├─2. Send Admin Notification Email
  │   │
  │   └─ nodemailer.sendMail({
  │        from: your-email@gmail.com
  │        to: NOTIFICATION_EMAIL
  │        subject: "New Contact: John - development"
  │        body: Name, Email, Service, Message
  │      })
  │        │
  │        └─ GMAIL SMTP SERVER (smtp.gmail.com:587)
  │             │
  │             └─ Authenticated with app password
  │                  │
  │                  └─ Email lands in your inbox
  │
  └─3. Send Confirmation Email to User
      │
      └─ nodemailer.sendMail({
           from: your-email@gmail.com
           to: john@example.com
           subject: "We got your message"
           body: "Thank you, we'll get back to you soon"
         })
           │
           └─ GMAIL SMTP SERVER (smtp.gmail.com:587)
                │
                └─ Email lands in user's inbox
```

---

## 💳 Payment Flow (When Integrated)

```
FRONTEND: User enters card details
          │
          ├─ Create payment intent
          │  POST /api/payment
          │  {amount: 99, currency: "usd"}
          │
          └─► BUN SERVER
              {
                clientSecret: "pi_......"
                id: "pi_1234567"
              }
              │
              ├─ STRIPE API (stripe.com)
              │  Transaction created in test mode
              │
              └─ Stripe dashboard shows pending payment
                 │
                 └─ User completes payment using Stripe.js
                    (card: 4242 4242 4242 4242)
                    │
                    └─ Stripe confirms payment succeeded
                       │
                       └─ Frontend calls /api/product
                          {paymentIntentId: "pi_1234567"}
                          │
                          └─► BUN SERVER verifies payment
                              │
                              ├─ Query Stripe: Did payment succeed?
                              │ YES? Continue
                              │ │
                              │ └─ Send product delivery email
                              │    │
                              │    └─► User receives product link
                              │
                              └─ Return success response
```

---

## 🎯 What Does Each File Do?

### Frontend (React)

**Location:** `components/Contact.tsx`

**What it does:**
- Renders the contact form UI
- Collects user input (name, email, service, message)
- Validates locally before sending
- Shows loading state while submitting
- Makes HTTP POST to backend
- Displays success/error messages
- Matches brutalist styling of Dtul website

**Key Functions:**
```typescript
handleChange()    // Updates form state as user types
handleSubmit()    // Sends data to backend
```

---

### Backend Server

**Location:** `backend/server.ts`

**What it does:**
- Listens on http://localhost:3001
- Routes incoming requests to handlers
- Configures CORS headers
- Handles OPTIONS requests

**Routes:**
- `POST /api/contact` → handleContactForm
- `POST /api/payment` → handlePaymentIntent
- `POST /api/product` → handleProductDelivery

---

### Contact Handler

**Location:** `backend/handlers/contact.ts`

**What it does:**
1. Receives form data from frontend
2. Validates all required fields
3. Validates email format
4. Authenticates with Google Sheets API
5. Appends row to Google Sheet
6. Sends admin notification email
7. Sends confirmation email to user
8. Returns success response

**Dependencies:**
- `googleapis` (Google Sheets SDK)
- `nodemailer` (Email sending)
- Environment variables: GOOGLE_* and EMAIL_*

---

### Payment Handler

**Location:** `backend/handlers/payment.ts`

**What it does:**
1. Receives payment amount and currency
2. Authenticates with Stripe
3. Creates a Payment Intent
4. Returns clientSecret (for frontend)
5. Returns paymentIntentId (for later verification)

**Dependencies:**
- `stripe` SDK
- Environment variables: STRIPE_SECRET_KEY

---

### Product Delivery Handler

**Location:** `backend/handlers/product.ts`

**What it does:**
1. Receives paymentIntentId and email
2. Queries Stripe to verify payment succeeded
3. If payment succeeded: send product email
4. If payment failed: return error
5. Returns success response

**Dependencies:**
- `stripe` SDK
- `nodemailer`
- Environment variables: STRIPE_* and EMAIL_*

---

## 🗂️ Environment Variables - What They Do

### Google APIs

```
GOOGLE_CLIENT_EMAIL
├─ Service account email (from JSON key)
├─ Used to authenticate requests to Google
└─ Looks like: dtul-sheets@dtul-project.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY
├─ Secret key from JSON file
├─ Used to cryptographically sign requests
└─ Starts with: "-----BEGIN PRIVATE KEY-----\n"

GOOGLE_SHEET_ID
├─ ID of your Google Sheet where submissions are stored
├─ Extract from URL: docs.google.com/spreadsheets/d/[THIS_PART]/
└─ Example: 1a2b3c4d5e6f7g8h9i0jklmnop
```

### Gmail Configuration

```
EMAIL_USER
├─ Gmail address that sends emails
├─ Must have 2-factor authentication enabled
└─ Example: dtul.admin@gmail.com

EMAIL_PASS
├─ App-specific password (NOT regular password)
├─ Generated in myaccount.google.com/apppasswords
├─ 16 characters: xxxx xxxx xxxx xxxx
└─ Different from Gmail login password

NOTIFICATION_EMAIL
├─ Where admin notifications go
├─ Can be same as EMAIL_USER or different
└─ Example: admin@dtul.com
```

### Stripe

```
STRIPE_SECRET_KEY
├─ Secret key for backend (NEVER expose to frontend)
├─ Used to create payments and verify transactions
├─ Test key starts with: sk_test_
└─ Example: sk_test_51KmL2nFKu7sXxxxxxx

STRIPE_PUBLISHABLE_KEY
├─ Public key for frontend (can be exposed)
├─ Used by Stripe.js for payment UI
├─ Test key starts with: pk_test_
└─ Example: pk_test_51KmL2nFKu7sXxxxxxx
```

### Server

```
PORT
├─ Which port the server listens on
├─ Default: 3001
└─ Example: 3001
```

---

## 🔐 How Authentication Works

### Google Sheets API

```
┌─────────────────┐
│ Request from    │
│ backend         │
│ (contact.ts)    │
└────────┬────────┘
         │
         ├─ Include service account email
         ├─ Include private key
         │
         └─► Google APIs
             │
             ├─ Verify: Is this a real service account?
             ├─ Verify: Has this account permission to edit sheet?
             │
             └─ IF verified: Allow append operation
                IF denied: Return 403 Forbidden
```

### Gmail / Nodemailer

```
┌──────────────────┐
│ nodemailer       │
│ connects to      │
│ Gmail SMTP       │
└────────┬─────────┘
         │
         ├─ Connect to smtp.gmail.com:587
         ├─ Authenticate with EMAIL_USER
         ├─ Authenticate with EMAIL_PASS (app password)
         │
         └─► Gmail SMTP Server
             │
             ├─ Verify: Are these credentials valid?
             ├─ Verify: Is 2-factor auth enabled on account?
             │
             └─ IF verified: Send the email
                IF denied: Return authentication error
```

### Stripe

```
┌──────────────────┐
│ Stripe SDK       │
│ (payment.ts)     │
└────────┬─────────┘
         │
         ├─ Include STRIPE_SECRET_KEY in headers
         │
         └─► Stripe API (stripe.com)
             │
             ├─ Verify: Is this a real API key?
             ├─ Verify: Does account have permission?
             │
             └─ IF verified: Process the request
                IF denied: Return 401 Unauthorized
```

---

## 📊 Data Storage

### Google Sheets (Your Database)

**Spreadsheet:** "Dtul Contacts"

**Headers (Row 1):**
- A: timestamp
- B: name
- C: email
- D: service
- E: message

**Example Data (Row 2):**
```
2024-03-13T10:25:30Z | John Doe | john@example.com | development | Build me an API
```

**Why Google Sheets?**
- ✓ FREE storage (no database cost)
- ✓ Can query via Google Sheets API
- ✓ Can view/sort manually
- ✓ Automatic backups
- ✓ Share/collaborate easily
- ✓ Export to CSV anytime

---

## 🔄 Request/Response Flow Summary

### Contact Form

| Step | Component | Action | Status |
|------|-----------|--------|--------|
| 1 | Frontend | User fills form | ⏳ Pending |
| 2 | Contact.tsx | Form validation | ✓ Valid or ✗ Invalid |
| 3 | Frontend → Backend | POST /api/contact | 📤 Sending |
| 4 | Server | CORS check | ✓ Allowed |
| 5 | Handler | Data validation | ✓ Valid |
| 6 | Handler | Append to Sheets | ✓ Saved |
| 7 | Handler | Send admin email | ✓ Sent |
| 8 | Handler | Send user email | ✓ Sent |
| 9 | Backend → Frontend | Response JSON | 📥 Receiving |
| 10 | Frontend | Update UI | ✓ Success message |

---

## 🚨 Error Handling

### What Happens When Something Goes Wrong?

```
User submits form
  │
  ├─ Missing fields?
  │  └─ Return: {"error": "All fields required"}
  │     Frontend shows: "✗ Error: All fields required"
  │
  ├─ Invalid email?
  │  └─ Return: {"error": "Invalid email format"}
  │     Frontend shows: "✗ Error: Invalid email format"
  │
  ├─ Google Sheets fails?
  │  └─ Return: {"error": "Failed to process contact"}
  │     Frontend shows: "✗ Error: Failed to process contact"
  │     Backend logs: Actual Google API error
  │
  └─ Email sending fails?
     └─ Return: {"error": "Failed to process contact"}
        Frontend shows: "✗ Error: Failed to process contact"
        Backend logs: Actual email error
        (Sheet entry still saved!)
```

---

## 🎓 What You've Learned

✅ **Frontend → Backend communication:** Contact.tsx makes HTTP POST  
✅ **API Routing:** Server directs requests to correct handlers  
✅ **Data validation:** Fields checked before processing  
✅ **Database storage:** Google Sheets as your database  
✅ **Email automation:** Nodemailer sends emails via Gmail SMTP  
✅ **Authentication:** Service accounts, app passwords, API keys  
✅ **Payment processing:** Stripe for future payment flows  
✅ **Error handling:** Graceful fallbacks and messages  

---

## 🔍 How to Debug

### "Form not submitting" → Check:
1. Is backend running? (`bun dev` in backend folder)
2. Is frontend running? (`bun run dev` in frontend folder)
3. Browser console for errors (F12)
4. Network tab to see if POST request is sent
5. Backend console for errors

### "Emails not arriving" → Check:
1. EMAIL_PASS is app password (not regular password)
2. 2-factor auth is enabled on Gmail
3. Backend logs show "Email sent successfully"
4. Check spam folder

### "Data not in sheet" → Check:
1. GOOGLE_SHEET_ID is correct (copy from URL)
2. Sheet is shared with service account email
3. Column headers exist (A: timestamp, B: name, etc.)
4. Backend logs show successful append

---

**Now you understand the complete flow! Ready to test?**

→ Follow [TESTING-GUIDE.md](./TESTING-GUIDE.md) for step-by-step testing instructions.
