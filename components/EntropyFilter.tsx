import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EntropyFilter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noiseGroupRef = useRef<HTMLDivElement>(null);
  const structureGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: true,
          pin: true,
        }
      });

      // Scatter noise initially
      gsap.set('.noise-dot', {
        x: 'random(-500, 500)',
        y: 'random(-300, 300)',
        opacity: 'random(0.1, 0.5)'
      });

      // Move noise down and fade out
      tl.to('.noise-dot', {
        y: '+=200',
        opacity: 0,
        stagger: {
          each: 0.05,
          from: 'random'
        },
        duration: 2
      });

      // Show structure emerging
      tl.fromTo(structureGroupRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5 },
        '-=1'
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative flex flex-col items-center justify-center bg-slate-950 overflow-hidden font-mono border-y border-slate-900">
      
      <div className="absolute top-10 left-10 text-xs text-sky-500 tracking-widest uppercase">
        [SYSTEM][STATUS][DECAY_DETECTION]
      </div>

      <div className="z-10 text-center max-w-2xl px-6 pointer-events-none" style={{ position: 'absolute', top: '20%' }}>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          In 2025, attention is no longer an asset; it's a liability. Ad-revenue is the white noise of a dying era.
        </p>
      </div>

      {/* Noise Container */}
      <div ref={noiseGroupRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="noise-dot absolute w-1 h-1 bg-slate-400 rounded-full" />
        ))}
      </div>

      {/* Structure Container */}
      <div ref={structureGroupRef} className="z-20 text-center flex flex-col items-center justify-center bg-slate-900 border border-sky-500/30 p-8 shadow-[0_0_40px_rgba(14,165,233,0.1)]">
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-[0.2em] mb-4">THE NICHE STRUCTURE</h3>
        <ul className="text-left text-sm text-slate-400 space-y-3">
          <li className="flex items-center gap-3"><span className="text-sky-500">▶</span> Niche utility</li>
          <li className="flex items-center gap-3"><span className="text-sky-500">▶</span> High-velocity conversion</li>
          <li className="flex items-center gap-3"><span className="text-sky-500">▶</span> Owned infrastructure</li>
        </ul>
      </div>

    </section>
  );
}
