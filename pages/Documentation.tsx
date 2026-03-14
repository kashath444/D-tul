import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../components/FooterPageStyles.css';

const Documentation: React.FC = () => {
    React.useLayoutEffect(() => {
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = ''; };
    }, []);

    const sections = [
        { id: '01', title: 'PROJECT INTAKE', desc: 'Every D-TUL engagement begins with a structured intake process. Submit your project brief through the First Contact form. Within 48 hours, you receive a scope document outlining deliverables, timeline, and investment.' },
        { id: '02', title: 'ARCHITECTURE PHASE', desc: 'Before a single line of production code is written, we design the full system architecture — component hierarchy, animation timeline, responsive breakpoints, and performance targets. You approve the blueprint before execution begins.' },
        { id: '03', title: 'EXECUTION & DELIVERY', desc: 'Development follows a milestone-based workflow. You receive live staging links at each checkpoint for review. Final delivery includes full source code, deployment configuration, and a handover document.' },
        { id: '04', title: 'TECH STACK', desc: 'React 19 + Vite 6 for core architecture. GSAP for scroll-driven animation. Three.js for 3D experiences. Tailwind CSS for design tokens. Deployed on Vercel/Netlify with CI/CD pipelines.' },
        { id: '05', title: 'AI WORKFLOW INTEGRATION', desc: 'Our automation services leverage n8n, WhatsApp Business API, and custom LLM pipelines. Each workflow is documented with trigger maps, data flow diagrams, and fallback protocols.' },
        { id: '06', title: 'SUPPORT & MAINTENANCE', desc: 'Post-launch support is available in 30/60/90 day packages. Includes bug fixes, performance monitoring, and up to 5 content updates per month. Extended maintenance contracts available on request.' },
    ];

    return (
        <div className="legal-page">
            <Header isVisible={true} theme="crimson" />
            <main className="legal-main">
                <p className="mono legal-tag">RESOURCE_CENTER</p>
                <h1 className="heading legal-title">DOCUMENTATION</h1>
                <p className="mono legal-date">How D-TUL operates — since 2025</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '40px' }}>
                    {sections.map((s) => (
                        <div key={s.id} className="doc-card">
                            <div className="mono doc-card-id">SYS_DOC: {s.id}</div>
                            <h3 className="heading doc-card-title">{s.title}</h3>
                            <p className="mono doc-card-desc">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Documentation;
