import React, { useState } from 'react';
import { Terminal, Database, Activity, Code2, Globe, Cpu } from 'lucide-react';

const codeSnippet = `
{
  "name": "0-Latency-Responder-Core",
  "nodes": [
    { "type": "webhook", "position": [250, 300] },
    { "type": "openAi", "intent": "parse_lead", "model": "gpt-4o" },
    { "type": "whatsapp_api", "action": "send_scheduler_link" }
  ]
}
`;

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-mono overflow-x-hidden relative selection:bg-sky-500/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: 'linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
             backgroundSize: '40px 40px'
           }}
      />

      <nav className="fixed top-0 w-full border-b border-slate-800 bg-[#020617]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-400">
            <Terminal size={20} />
            <span className="font-bold tracking-tight">D-TUL_ARCHITECTURE</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm text-slate-400">
            <a href="#manifesto" className="hover:text-sky-400 transition-colors">[ MANIFESTO ]</a>
            <a href="#logic" className="hover:text-sky-400 transition-colors">[ LOGIC_MODELS ]</a>
            <a href="#intake" className="hover:text-sky-400 transition-colors">[ SYSTEM_INTAKE ]</a>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto z-10">
        
        {/* HERO */}
        <section id="manifesto" className="mb-32">
          <div className="inline-block px-3 py-1 border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs mb-6 rounded-sm">
            STATUS: SYSTEM READY // V3.0
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter text-white">
            WE ENGINEER <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
              0-LATENCY ARCHITECTURES.
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed">
            Stop losing revenue to manual operations. We tear down failing legacy monoliths and replace human triage bottlenecks with high-fidelity, API-driven logic engines.
          </p>
          <div className="flex gap-4">
            <a href="#intake" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 transition-colors flex items-center gap-2">
              <Activity size={18} /> INITIATE_DIAGNOSTIC
            </a>
            <a href="#logic" className="border border-slate-700 hover:border-slate-500 bg-slate-900/50 px-6 py-3 transition-colors text-slate-300">
              EXPLORE_LOGIC_MAPS
            </a>
          </div>
        </section>

        {/* LOGIC MODELS */}
        <section id="logic" className="mb-32">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-3 border-b border-slate-800 pb-4">
            <Database size={24} className="text-sky-400" /> 
            // CORE_LOGIC_MODELS
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-slate-800 bg-[#060b19] p-6 relative group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sky-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sky-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                  <Activity size={16} className="text-sky-400" />
                </div>
                <h3 className="text-xl font-bold">The 0-Latency Responder</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 h-16">
                Instant webhook > OpenAI parser > WhatsApp logic map. Replaces human triage to prevent 48% lead decay.
              </p>
              
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm text-xs font-mono text-sky-300/80 mb-6 overflow-x-auto">
                <pre>{codeSnippet.trim()}</pre>
              </div>
              
              <div className="flex justify-between items-center text-sm border-t border-slate-800 pt-4 mt-auto">
                <span className="text-slate-500">Est. Time: 1-2 Wks</span>
                <span className="text-sky-400 block font-bold">From $2,500</span>
              </div>
            </div>

            <div className="border border-slate-800 bg-[#060b19] p-6 relative group">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sky-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sky-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                  <Database size={16} className="text-sky-400" />
                </div>
                <h3 className="text-xl font-bold">The Live-Ledger Bridge</h3>
              </div>
              <p className="text-slate-400 text-sm mb-6 h-16">
                Stripe webhooks > Supabase > Live Portal. Eliminates manual Excel syncing and invoice reconciliation.
              </p>
              
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-sm text-xs font-mono text-sky-300/80 mb-6 overflow-x-auto">
                <pre>{`\n{\n  "table": "customer_ledgers",\n  "schema": {\n    "ledger_id": "uuid PK",\n    "balance": "numeric(12,2)"\n  }\n}\n`}</pre>
              </div>

              <div className="flex justify-between items-center text-sm border-t border-slate-800 pt-4 mt-auto">
                <span className="text-slate-500">Est. Time: 3-4 Wks</span>
                <span className="text-sky-400 block font-bold">From $5,000</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTAKE PORTAL */}
        <section id="intake" className="mb-32">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
            <Cpu size={24} className="text-sky-400" />
            // SYSTEM_DIAGNOSTIC_INTAKE
          </h2>
          <div className="border border-slate-800 bg-[#060b19] p-8 md:p-12 relative max-w-3xl">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-500"></div>
              
            <p className="text-slate-400 mb-8 max-w-lg">
              Input your operational bottleneck parameters. Our architecture team will review your endpoints and propose a 0-latency logic map within 24 hours.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs text-sky-400 mb-2 uppercase">{"<target_url>"}</label>
                <input type="text" placeholder="https://your-company.com" className="w-full bg-[#020617] border border-slate-800 p-3 text-sm focus:border-sky-500 focus:outline-none transition-colors text-slate-300" />
              </div>
              
              <div>
                <label className="block text-xs text-sky-400 mb-2 uppercase">{"<primary_bottleneck>"}</label>
                <select className="w-full bg-[#020617] border border-slate-800 p-3 text-sm focus:border-sky-500 focus:outline-none transition-colors text-slate-300 appearance-none">
                  <option>Lead Response Latency (> 5 mins)</option>
                  <option>Manual Invoice/Ledger Syncing</option>
                  <option>Legacy Tech Stack Collapse (Scalability)</option>
                  <option>Data Silos (CRM not talking to DB)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-sky-400 mb-2 uppercase">{"<diagnostics_log_details>"}</label>
                <textarea rows={4} placeholder="Describe the manual process that costs you the most man-hours..." className="w-full bg-[#020617] border border-slate-800 p-3 text-sm focus:border-sky-500 focus:outline-none transition-colors text-slate-300"></textarea>
              </div>

              <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-8 py-3 w-full transition-colors uppercase tracking-wider text-sm">
                Execute_Diagnostic_Request
              </button>
            </form>
          </div>
        </section>

      </main>

      <footer className="border-t border-slate-900 bg-[#020617] py-8 text-center text-xs text-slate-600 font-mono relative z-10">
        <p>D-TUL ARCHITECTURES © {new Date().getFullYear()} // 0-LATENCY SYSTEMS.</p>
      </footer>
    </div>
  );
};

export default Home;
