import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ConversionRow = ({ rate, views, customers, revenue, delay }: { rate: string, views: string, customers: string, revenue: string, delay: number }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4 border border-slate-800 bg-slate-900/50 backdrop-blur-sm rounded-lg my-2 model-row opacity-0" 
             style={{ transform: 'translateY(20px)' }}>
            <div className="flex-1 text-center md:text-left font-mono text-sky-400 mb-2 md:mb-0">
                <span className="text-xs text-slate-500 block">CONVERSION</span>
                {rate}
            </div>
            <div className="flex-1 text-center font-mono text-slate-300 mb-2 md:mb-0">
                <span className="text-xs text-slate-500 block">TRAFFIC/MO</span>
                {views}
            </div>
            <div className="flex-1 text-center font-mono text-slate-300 mb-2 md:mb-0">
                <span className="text-xs text-slate-500 block">CUSTOMERS</span>
                {customers}
            </div>
            <div className="flex-1 text-center md:text-right font-mono text-emerald-400 font-bold">
                <span className="text-xs text-slate-500 block">REVENUE</span>
                {revenue}
            </div>
        </div>
    );
};

const EconomicModel: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
            }
        });

        tl.to(".model-header", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
        })
        .to(".model-row", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.4")
        .to(".model-conclusion", {
            opacity: 1,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.2");

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 relative bg-[#020617] overflow-hidden border-t border-slate-800" id="economic-model">
            {/* Background Grid Elements */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="model-header opacity-0" style={{ transform: 'translateY(30px)' }}>
                    <p className="font-mono text-sky-400 text-sm tracking-widest mb-2 uppercase">The Math Behind the Architecture</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                        Niche Leverage vs. Ad Revenue
                    </h2>
                    <p className="text-slate-400 text-lg mb-12 font-mono max-w-2xl leading-relaxed">
                        Traditional creators rely on massive scale to monetize fractions of a cent per view. 
                        The Architect builds targeted structure out of noise. At a <span className="text-white font-bold">$97 price point</span>, 
                        even hyper-conservative conversion rates yield sustainable independence.
                    </p>
                </div>

                <div className="mb-12">
                    {/* Header Row for Desktop */}
                    <div className="hidden md:flex justify-between items-center p-4 border-b border-sky-900/50 mb-4 model-header opacity-0">
                        <div className="flex-1 text-left font-mono text-xs text-sky-500 tracking-widest">SCENARIO</div>
                        <div className="flex-1 text-center font-mono text-xs text-slate-500 tracking-widest">MONTHLY VIEWS</div>
                        <div className="flex-1 text-center font-mono text-xs text-slate-500 tracking-widest">ACQUISITIONS</div>
                        <div className="flex-1 text-right font-mono text-xs text-emerald-500 tracking-widest">GROSS YIELD</div>
                    </div>

                    <ConversionRow delay={0} rate="0.1% (Pessimistic)" views="100,000" customers="100" revenue="$9,700/mo" />
                    <ConversionRow delay={1} rate="1.0% (Standard)" views="100,000" customers="1,000" revenue="$97,000/mo" />
                    <ConversionRow delay={2} rate="3.0% (Optimized)" views="100,000" customers="3,000" revenue="$291,000/mo" />
                </div>

                <div className="model-conclusion bg-sky-950/20 border-l-2 border-sky-500 p-6 md:p-8 opacity-0">
                    <h3 className="text-sky-400 font-mono text-xl mb-4">The D-Tul Advantage</h3>
                    <p className="text-slate-300 font-mono leading-relaxed">
                        You do not need millions of followers to break out of the algorithmic cage. 
                        You need <span className="text-white">targeted throughput</span> and <span className="text-white">high-signal conversion mechanics</span>. 
                        We build the architecture; you feed it the noise.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EconomicModel;
