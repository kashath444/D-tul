import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function handlePaymentIntent(req: Request, corsHeaders: Record<string, string>) {
  const body = await req.json();
  const { amount, currency = "usd", productId } = body;

  if (!amount || amount <= 0) {
    return new Response(JSON.stringify({ error: "Invalid amount" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { productId },
    });

    return new Response(JSON.stringify({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Payment intent error:", error);
    return new Response(JSON.stringify({ error: "Failed to create payment intent" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}