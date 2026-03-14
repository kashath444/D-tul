import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/FooterPageStyles.css';

gsap.registerPlugin(ScrollTrigger);

const VersionLogs: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    // Timeline reversed: oldest first → newest last
    const logs = [
        { version: 'v1.0.0', date: 'August 2025', title: 'Initial Launch', changes: ['Core React + Vite architecture', 'Home page with loading sequence', 'Header navigation with dropdown', 'Contact form with validation', 'Pinterest social integration'] },
        { version: 'v1.5.0', date: 'September 2025', title: 'Design System Overhaul', changes: ['Brutalist hero with glitch animation', 'Deep crimson design token system', 'JetBrains Mono + Impact typography stack', 'Mobile-first responsive grid system'] },
        { version: 'v2.0.0', date: 'November 2025', title: 'The Arsenal Rebuild', changes: ['New Arsenal card system with hover effects', 'Product routing architecture implemented', 'GSAP spine animation on home page', 'Footer infrastructure with social and legal links'] },
        { version: 'v2.5.0', date: 'January 2026', title: 'First Contact Experience', changes: ['Three.js 3D canvas with animated cube and infinite grid', 'Entropy Filter scroll experience', 'Throughput Yield comparison dashboard', 'Sky blue theme system for sub-pages'] },
        { version: 'v3.0.0', date: 'February 2026', title: 'AI Workflows Marketplace', changes: ['AI Workflows page with 8 industry niches', 'Purple theme system for consistent branding', 'Search and filter functionality across all workflows', 'Modal detail view with pricing tiers'] },
        { version: 'v3.1.0', date: 'March 2026', title: 'Architecture Module Launch', changes: ['Landing Page Architecture module released', 'Green theme system added for Architecture page', 'Custom animated blueprint background with floating particles', 'Footer pages with legal and resource content'] },
    ];

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.utils.toArray<HTMLElement>('.vl-entry').forEach((entry, i) => {
            gsap.to(entry, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: entry,
                    start: 'top 80%',
                    end: 'top 40%',
                    toggleActions: 'play none none reverse',
                }
            });

            // Animate the timeline line segment
            const dot = entry.querySelector('.vl-dot') as HTMLElement;
            if (dot) {
                ScrollTrigger.create({
                    trigger: entry,
                    start: 'top 80%',
                    onEnter: () => entry.classList.add('vl-visible'),
                    onLeaveBack: () => entry.classList.remove('vl-visible'),
                });
            }
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="vl-page">
            <Header isVisible={true} theme="crimson" />
            <main className="vl-main">
                <p className="mono legal-tag">RESOURCE_CENTER</p>
                <h1 className="heading legal-title">VERSION LOGS</h1>
                <p className="mono legal-date">Architecture evolves — changelog since v1.0.0</p>

                <div className="vl-timeline" style={{ marginTop: '56px' }}>
                    {logs.map((log, i) => (
                        <div key={log.version} className="vl-entry">
                            <div className="vl-dot" />
                            <div className="mono vl-date">{log.date}</div>
                            <div className="mono vl-version">{log.version}</div>
                            <h3 className="heading vl-title">{log.title}</h3>
                            {log.changes.map((c, j) => (
                                <div key={j} className="mono vl-change">{c}</div>
                            ))}
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VersionLogs;
