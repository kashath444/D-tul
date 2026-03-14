import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ThroughputVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricARef = useRef<HTMLDivElement>(null);
  const metricBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
        }
      });

      tl.fromTo(metricARef.current, { opacity: 0, x: -50 }, { opacity: 0.5, x: 0, duration: 1 })
        .fromTo(metricBRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '-=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen w-full relative flex flex-col items-center justify-center bg-slate-950 font-mono py-20 px-4">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl text-white tracking-[0.2em] mb-4">THROUGHPUT YIELD</h2>
        <div className="text-xs text-slate-500 tracking-widest border border-slate-800 px-4 py-2 inline-block">
          YIELD = (REACH * RESONANCE) ^ SYSTEM_EFFICIENCY
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-stretch">
        
        {/* Metric A: Passive Loop */}
        <div ref={metricARef} className="flex-1 border border-slate-800 bg-slate-900/50 p-8 flex flex-col">
          <div className="text-xs text-slate-500 tracking-[0.2em] mb-6">METRIC.A / PASSIVE_LOOP</div>
          <div className="space-y-4 mb-8 flex-1 text-sm text-slate-400">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Input (Reach):</span>
              <span className="text-white">1,000,000 Views</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Efficiency (Ad-Rev CPM):</span>
              <span className="text-rose-400">0.002</span>
            </div>
          </div>
          <div className="border border-slate-800 p-4 text-center mt-auto">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Fragile Return</div>
            <div className="text-2xl text-slate-300">$2,000</div>
          </div>
        </div>

        {/* Metric B: Systemic Path */}
        <div ref={metricBRef} className="flex-1 border border-sky-500/50 bg-slate-900/80 p-8 flex flex-col relative overflow-hidden shadow-[0_0_30px_rgba(14,165,233,0.1)]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-3xl rounded-full" />
          
          <div className="text-xs text-sky-400 tracking-[0.2em] mb-6">METRIC.B / SYSTEMIC_PATH (D-TUL)</div>
          <div className="space-y-4 mb-8 flex-1 text-sm text-slate-300">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Input (Reach):</span>
              <span className="text-white">1,000,000 Views</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Efficiency (Min. Conv.):</span>
              <span className="text-sky-400">0.001 (0.1%)</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span>Avg Product Logic:</span>
              <span className="text-sky-400">$97</span>
            </div>
          </div>
          <div className="border border-sky-500 bg-sky-500/10 p-4 text-center mt-auto">
            <div className="text-[10px] text-sky-400 uppercase tracking-widest mb-1">Resilient Floor</div>
            <div className="text-3xl text-white font-bold">$97,000</div>
            <div className="text-[10px] text-sky-500/50 mt-2 font-mono">48.5x LEVERAGE</div>
          </div>
        </div>

      </div>

      <div className="mt-24 pointer-events-auto">
        <Link to="/#contact" className="relative group overflow-hidden border border-sky-500 px-8 py-4 bg-[#020617] cursor-pointer inline-block">
          <span className="relative z-10 text-sm font-bold tracking-[0.2em] text-sky-400 group-hover:text-slate-950 transition-colors duration-500">
            INITIATE PARTNERSHIP
          </span>
          <div className="absolute inset-0 bg-sky-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
        </Link>
      </div>

    </section>
  );
}
