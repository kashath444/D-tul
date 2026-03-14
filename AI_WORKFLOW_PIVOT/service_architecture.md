# D-Tul: AI Workflow Service Architecture

Based on the initial analysis of enterprise case studies (Legacy Technical Migration vs. B2B Automation), D-Tul 3.0 will offer a multi-tiered service model. We distinguish between "Pre-built/Rapid Deploy" and "Custom Architecture" to manage client expectations, pricing, and our delivery bandwidth.

## 1. The ICP (Ideal Customer Profile)

We are targeting companies suffering from **"The Fidelity Gap"**: 
- **Type A: The Scaling Bottleneck (B2B E-commerce/Wholesale, Agencies)**. They have high inquiry volume but are stuck in manual "WhatsApp/Excel" workflows. They lose leads due to latency.
- **Type B: The Legacy Anchor (Education, Healthcare, Old-Tech Boutiques)**. They have established brands and user bases, but their underlying infrastructure (e.g., Legacy PHP) is fracturing under load.

## 2. Service Tiers & Pricing Matrix

### Tier 1: "Rigid Response" (Pre-built Logic Automations)
*Focus: Instant ROI, lead capture, and communication automation.*
- **What it is**: Plug-and-play AI workflows using existing tools (n8n, Make) combined with APIs (WhatsApp, Gmail, CRM).
- **Example**: The B2B E-commerce Vendor Inquiry & Follow-up loop.
- **Tech Stack**: n8n (self-hosted or cloud), WhatsApp Business API, OpenAI API (for dynamic routing/basic NLP), Webhooks.
- **Delivery Timeline**: 1 to 2 Weeks.
- **Estimated Pricing**: $1,500 - $3,500 setup + optional maintenance retainer ($500/mo).
- **Pitch**: "We replace your human response bottleneck with a 0-latency logic engine."

### Tier 2: "Workflow Integration" (Custom Data Logic)
*Focus: Deep operational efficiency, legacy system bridging, and financial/inventory automation.*
- **What it is**: Connecting disparate enterprise tools (e.g., connecting a clunky ERP to a modern CRM and front-end).
- **Example**: Automated Customer-wise Ledgers and Real-time Balance tracking bridged from Excel to a custom DB.
- **Tech Stack**: Bun (for custom API layers), PostgreSQL/Supabase, n8n, tailored Python scripts for data transformation.
- **Delivery Timeline**: 3 to 6 Weeks.
- **Estimated Pricing**: $5,000 - $12,000+.
- **Pitch**: "We eliminate your operational silos by engineering a unified data nervous system."

### Tier 3: "Technical Architecture Rebuild" (Full Migration)
*Focus: Long-term scalability, platform migration, and high-fidelity UI/UX.*
- **What it is**: Complete teardown and rebuild of legacy infrastructure.
- **Example**: The Legacy PHP to Laravel (or in our case, Bun/Vite/React) migration for a platform supporting 20k+ users.
- **Tech Stack**: Bun/Vite, React (Tailwind/Shadcn), modern backend (Node/Bun/Go depending on need), robust DB structuring.
- **Delivery Timeline**: 8 to 16+ Weeks.
- **Estimated Pricing**: $15,000 - $50,000+.
- **Pitch**: "Your brand has outgrown its foundation. We architect the platform for your next 10x scale."

## 3. The Tech Stack Identity

D-Tul will position itself as **Tool Agnostic but Outcome Rigid**. However, our internal "stack" will rely on speed and low overhead:
- **Automation/Integration**: n8n (primary), Make (secondary).
- **Compute/Custom Code**: Bun (preferred for speed), TypeScript.
- **Frontend/Portals**: Vite, React, Tailwind CSS (Brutal/Monospace aesthetic).
- **AI/Logic**: OpenAI (GPT-4o) for logic parsing, local models (if privacy strict).

## 4. Next Steps for D-Tul Buildout

To sell this, the new D-Tul website must NOT look like a "website agency." It must look like a **Technical Whitepaper or a System Terminal**.
- We need to draft 3-5 hypothetical (but realistic) JSON workflow files to display as "Proof of Logic" on the homepage.
- The lead capture form itself must be an automated, highly specific diagnostic tool (e.g., "Calculate your Latency Leak").
