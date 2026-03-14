# Dtul Backend - Quick Start & Testing Guide

**Status:** READY FOR LOCAL TESTING  
**Last Updated:** 2026-03-13

---

## 🎯 Quick Start (5 Minutes)

### Prerequisites
- [ ] Bun installed (`bun --version`)
- [ ] Gmail app password created (see BACKEND-SETUP.md Part B)
- [ ] Google Sheets API credentials saved (.env)
- [ ] Stripe test keys saved (.env)

### Step 1: Setup Environment File

Create `.env` in `/backend` directory:

```env
# Google APIs
GOOGLE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j

# Gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx
NOTIFICATION_EMAIL=your-notification-email@gmail.com

# Stripe (Test Keys)
STRIPE_SECRET_KEY=sk_test_51KmL2nxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_51KmL2nxxxxxx

# Server
PORT=3001
```

### Step 2: Start Backend

```bash
cd backend
bun dev
```

**Expected output:**
```
Backend server running on http://localhost:3001
```

### Step 3: Start Frontend (NEW TERMINAL)

```bash
cd dtul_-the-architect's-breakout
bun run dev
```

**Expected output:**
```
VITE v6.2.0  ready in 234 ms
➜  Local:   http://localhost:5173/D-tul
```

### Step 4: Test Contact Form

1. Navigate to `http://localhost:5173/D-tul/first-contact`
2. Fill out form:
   - Name: "Test User"
   - Email: "your-test@gmail.com"
   - Service: "development"
   - Message: "This is a test message"
3. Click "Send Message"
4. ✓ Form should show success message
5. ✓ You should receive admin notification email
6. ✓ Test user should receive confirmation email
7. ✓ Check Google Sheet for new row

---

## 📋 Verification Checklist

### Contact Form Endpoint (`/api/contact`)

**Test Data:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "development",
  "message": "Build me a backend API"
}
```

**Test with curl:**
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "service": "development",
    "message": "Test message"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Contact saved"
}
```

**Expected Emails:**
1. Admin notification (to NOTIFICATION_EMAIL)
2. Confirmation to user (to provided email)

**Expected Sheet Update:**
- New row in your Google Sheet with timestamp, name, email, service, message

---

### Payment Endpoint (`/api/payment`)

**Test Data:**
```json
{
  "amount": 99.99,
  "currency": "usd",
  "productId": "pro-plan-monthly"
}
```

**Test with curl:**
```bash
curl -X POST http://localhost:3001/api/payment \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 99.99,
    "currency": "usd",
    "productId": "pro-plan"
  }'
```

**Expected Response:**
```json
{
  "clientSecret": "pi_xxxxx_secret_xxxxx",
  "id": "pi_xxxxx"
}
```

**What it means:**
- `clientSecret` = Use this with Stripe.js in frontend to complete payment
- `id` = Payment Intent ID (save for verification later)

---

### Product Delivery Endpoint (`/api/product`)

**Test Data (after successful payment):**
```json
{
  "paymentIntentId": "pi_xxxxx",
  "email": "customer@example.com"
}
```

**Test with curl:**
```bash
curl -X POST http://localhost:3001/api/payment \
  -H "Content-Type: application/json" \
  -d '{
    "paymentIntentId": "pi_xxxxx",
    "email": "customer@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true
}
```

**Expected Result:**
- Product delivery email sent to customer
- Email contains product or download link

---

## 🔍 Troubleshooting

### Problem: "Missing required fields"
**Cause:** Form validation failed  
**Solution:** Ensure all fields (name, email, service, message) are filled

### Problem: "Failed to process contact"
**Cause:** Backend error (check server logs)  
**Solution:**
1. Check backend console for error message
2. Verify .env variables are correct
3. Check Google Sheets API is enabled
4. Try curl test above to isolate issue

### Problem: "Invalid email format"
**Cause:** Email validation failed  
**Solution:** Verify email has @ and domain

### Problem: "Email not sending"
**Cause:** Gmail authentication failed  
**Solution:**
1. Verify EMAIL_PASS is App Password (not regular password)
2. Enable 2-factor authentication on Google account
3. Regenerate app password
4. Update .env

### Problem: "Failed to create payment intent"
**Cause:** Stripe authentication failed  
**Solution:**
1. Verify STRIPE_SECRET_KEY is correct (starts with `sk_test_`)
2. Ensure test mode is enabled in Stripe dashboard
3. Check API keys haven't expired

### Problem: CORS errors in browser console
**Cause:** Frontend → Backend communication blocked  
**Solution:**
1. Verify backend is running on localhost:3001
2. Check CORS headers in server.ts
3. Frontend should be on localhost:5173

### Problem: "Payment not completed"
**Cause:** Payment intent not in succeeded status  
**Solution:**
1. Use Stripe test card: 4242 4242 4242 4242
2. Verify payment succeeded in Stripe dashboard
3. Check paymentIntentId is correct

---

## 📊 Testing Workflow

### Full Contact Flow Test (5 min)

```
1. Open http://localhost:5173/D-tul/first-contact
2. Fill form with valid data
3. Submit
4. ✓ See success message in browser
5. ✓ Check email for admin notification
6. ✓ Check email for user confirmation
7. ✓ Check Google Sheet for new row
8. ✓ Verify all data matches
```

### Payment Flow Test (10 min)

```
1. Create payment intent:
   POST http://localhost:3001/api/payment
   {amount: 50, currency: "usd", productId: "test"}

2. Get clientSecret from response

3. Use Stripe.js to complete payment:
   - Card: 4242 4242 4242 4242
   - Exp: 12/25
   - CVC: 123

4. Call product delivery:
   POST http://localhost:3001/api/product
   {paymentIntentId: "...", email: "test@gmail.com"}

5. ✓ Check email for product delivery
6. ✓ Verify Stripe shows payment succeeded
```

---

## 🚀 Frontend Integration (When Ready)

### Contact Form Component

Your Contact.tsx now sends to backend:

```typescript
const response = await fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

### Payment Integration (Future)

```typescript
// 1. Create payment intent
const response = await fetch('http://localhost:3001/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    amount: 99.99,
    currency: 'usd',
    productId: 'premium-plan'
  })
});
const { clientSecret } = await response.json();

// 2. Use Stripe.js to complete payment
// (requires Stripe.js library in frontend)
// const { paymentIntent } = await stripe.confirmCardPayment(clientSecret);

// 3. Trigger product delivery
// await fetch('http://localhost:3001/api/product', {
//   method: 'POST',
//   body: JSON.stringify({
//     paymentIntentId: paymentIntent.id,
//     email: userEmail
//   })
// });
```

---

## 📝 API Reference

### POST /api/contact
**Contact form submission**

**Request:**
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "service": "string (required)",
  "message": "string (required)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact saved"
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

**Side Effects:**
- Appends row to Google Sheets
- Sends admin notification email
- Sends confirmation email to user

---

### POST /api/payment
**Create Stripe payment intent**

**Request:**
```json
{
  "amount": "number (required, > 0)",
  "currency": "string (optional, default: usd)",
  "productId": "string (optional)"
}
```

**Response (Success):**
```json
{
  "clientSecret": "string",
  "id": "string"
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

**Note:** Use `clientSecret` with Stripe.js in frontend

---

### POST /api/product
**Deliver product after payment**

**Request:**
```json
{
  "paymentIntentId": "string (required)",
  "email": "string (required)"
}
```

**Response (Success):**
```json
{
  "success": true
}
```

**Response (Error):**
```json
{
  "error": "Error message"
}
```

**Side Effects:**
- Verifies payment succeeded with Stripe
- Sends product delivery email to customer

---

## 🔐 Security Notes

### What's Safe
- ✅ App passwords (can be rotated)
- ✅ Service account keys (isolated permissions)
- ✅ Stripe test keys (limited scope)

### What's NOT Safe
- ❌ Never hardcode product files in handler
- ❌ Never expose STRIPE_SECRET_KEY to frontend
- ❌ Never log sensitive data
- ❌ Never commit .env file to git

### Keep Safe
- Store .env in `.gitignore`
- Rotate Gmail app password yearly
- Monitor Stripe dashboard for fraud
- Add rate limiting for production

---

## 📈 Next Steps

### Phase 1: Local Testing (NOW)
- [ ] Setup .env file
- [ ] Start backend (`bun dev`)
- [ ] Test contact form
- [ ] Verify emails arrive
- [ ] Check Google Sheet updates

### Phase 2: Frontend Integration
- [ ] Add Stripe.js to frontend
- [ ] Build payment form component
- [ ] Test payment flow end-to-end
- [ ] Add error handling

### Phase 3: Production Deployment
- [ ] Update CORS headers for production domain
- [ ] Deploy backend to Railway or similar
- [ ] Update frontend API endpoints
- [ ] Setup webhook handling for payments
- [ ] Add payment confirmation page

### Phase 4: Monitoring
- [ ] Setup error logging
- [ ] Monitor email deliverability
- [ ] Track failed payments
- [ ] Regular backup of Google Sheet

---

## 💡 Pro Tips

1. **Test Stripe webhook locally** (when ready):
   ```bash
   # Use Stripe CLI to forward webhooks
   stripe listen --forward-to localhost:3001/webhook
   ```

2. **Use Stripe dashboard for test data:**
   - View all test transactions
   - Simulate payment failures
   - Test refund flow

3. **Google Sheets sorting:**
   - Add header row manually
   - Format as table for easy filtering
   - Use timestamps for sorting

4. **Error tracking:**
   - Add to backend logs (production)
   - Use Sentry or similar service
   - Monitor email failure rates

5. **Rate limiting (future):**
   ```typescript
   // Add to server.ts for production
   if (rateLimitExceeded(req.ip)) {
     return new Response("Too many requests", { status: 429 });
   }
   ```

---

**🎉 You're ready to test! Start with Step 2 above and follow the Quick Start guide.**

*Questions? Check BACKEND-SETUP.md for detailed setup instructions and API information.*
