import { serve } from "bun";
import { handleContactForm } from "./handlers/contact";
import { handlePaymentIntent } from "./handlers/payment";
import { handleProductDelivery } from "./handlers/product";

const server = serve({
  port: process.env.PORT || 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:5173", // Vite dev server
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/api/contact" && req.method === "POST") {
        return await handleContactForm(req, corsHeaders);
      }

      if (url.pathname === "/api/payment" && req.method === "POST") {
        return await handlePaymentIntent(req, corsHeaders);
      }

      if (url.pathname === "/api/product" && req.method === "POST") {
        return await handleProductDelivery(req, corsHeaders);
      }

      return new Response("Not Found", { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500, headers: corsHeaders });
    }
  },
});

console.log(`Backend server running on http://localhost:${server.port}`);