
import React from 'react';
import { AnimationState } from '../types';

interface OverlayProps {
  phase: AnimationState;
}

const Overlay: React.FC<OverlayProps> = ({ phase }) => {
  const isRevealed = phase === AnimationState.REVEALED;

  return (
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center pointer-events-none">
      
      {/* Initial Loop Text (subtle) */}
      <div className={`absolute top-1/4 transition-opacity duration-1000 ${phase === AnimationState.LOOPING ? 'opacity-30' : 'opacity-0'}`}>
        <p className="font-mono text-sm tracking-[0.5em] text-slate-400 uppercase">System Iteration Loop: Active</p>
      </div>

      {/* Main Content Reveal */}
      <div className={`flex flex-col items-center max-w-2xl transition-all duration-1000 transform 
        ${isRevealed ? 'opacity-100 scale-100 translate-y-0 blur-none' : 'opacity-0 scale-95 translate-y-12 blur-xl'}`}>
        
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-sky-400 mb-4">A Blueprint for Reality</h2>
        
        <h1 className="font-serif text-5xl md:text-7xl mb-6 text-white leading-tight">
          ESCAPE THE <br/><span className="italic text-slate-300">AVERAGE</span>
        </h1>
        
        <p className="font-mono text-sm md:text-base text-slate-400 leading-relaxed mb-12">
          You have the vision, but the path is buried in the noise. 
          We use rigorous research and elite engineering to turn your 
          "stuck" ideas into high-velocity digital realities.
        </p>

        {/* Product Card (The First Contact) */}
        <div className="group pointer-events-auto relative w-64 md:w-80 h-48 rounded-xl bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-6 overflow-hidden hover:border-sky-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]">
           {/* Book Silhouette / Icon */}
           <div className="w-24 h-32 flex-shrink-0 bg-slate-950 border border-slate-800 rounded shadow-2xl flex flex-col items-center justify-center p-2">
             <div className="w-full h-1 bg-sky-500/50 mb-4" />
             <div className="text-[8px] font-mono text-slate-500 text-center uppercase">First Contact</div>
             <div className="flex-1" />
             <div className="text-[6px] font-mono text-slate-600">v1.0.4</div>
           </div>

           <div className="text-left">
             <h3 className="font-serif text-lg text-white mb-1">The First Contact</h3>
             <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">Blueprint for Breakout</p>
             <button className="px-3 py-1 bg-white text-slate-950 text-[10px] font-bold uppercase rounded hover:bg-sky-400 transition-colors">
               Access Now
             </button>
           </div>

           {/* Animated Gradient Beam */}
           <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent animate-[shimmer_3s_infinite]" />
        </div>
      </div>

      {/* Progress Footer */}
      <div className={`absolute bottom-12 w-full max-w-md px-10 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between font-mono text-[8px] text-slate-600 uppercase mb-2">
          <span>Stasis: Terminated</span>
          <span>Velocity: 99.8%</span>
        </div>
        <div className="h-[2px] w-full bg-slate-900 overflow-hidden">
          <div className="h-full bg-sky-500 w-full animate-[progress_10s_linear]" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(0); }
          100% { transform: translateX(200%); }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Overlay;
