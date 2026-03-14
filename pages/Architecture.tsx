import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import '../components/ArchitectureStyles.css';

gsap.registerPlugin(ScrollTrigger);

const G = '#22c55e';
const G_DIM = '#15803d';
const G_GLOW = 'rgba(34, 197, 94, 0.06)';
const G_BORDER = 'rgba(34, 197, 94, 0.15)';
const BG = '#000000';

const Architecture: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() => {
        const orig = document.body.style.overflow;
        document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = orig; };
    }, []);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.utils.toArray<HTMLElement>('.arch-reveal').forEach((el, i) => {
            gsap.fromTo(el,
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    delay: i * 0.05,
                    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );
        });
    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="arch-page-enter" style={{ background: BG, minHeight: '100vh', color: '#fff', position: 'relative' }}>
            {/* Animated Background Layer */}
            <div className="arch-bg" />
            <div className="arch-glow" />
            <div className="arch-scanline" />
            <div className="arch-corner-tl" />
            <div className="arch-corner-br" />
            {/* Floating Particles */}
            <div className="arch-particle" />
            <div className="arch-particle" />
            <div className="arch-particle" />
            <div className="arch-particle" />
            <div className="arch-particle" />

            <Header isVisible={true} theme="green" />

            {/* ── Hero ── */}
            <section style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '120px 24px 80px',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>
                <p className="mono arch-reveal" style={{
                    fontSize: '12px', color: G, letterSpacing: '0.4em',
                    textTransform: 'uppercase', marginBottom: '20px'
                }}>
                    ARCHITECTURE_MODULE_03
                </p>
                <h1 className="heading arch-reveal" style={{
                    fontSize: 'clamp(2.2rem, 7vw, 4rem)',
                    lineHeight: 1.05,
                    marginBottom: '32px',
                    letterSpacing: '-0.02em'
                }}>
                    EXCEPTIONAL WEBSITES<br />
                    SHOULDN'T COST A<br />
                    <span style={{ color: G }}>FORTUNE</span>.
                </h1>
                <p className="mono arch-reveal" style={{
                    fontSize: '15px', color: '#94a3b8', lineHeight: 1.8,
                    maxWidth: '560px'
                }}>
                    Full-stack, animated, conversion-optimized web architecture — 
                    built with the same frameworks used by top-tier studios — 
                    now delivered at Indian pricing. No templates. No compromises.
                </p>
            </section>

            {/* ── Feature Grid ── */}
            <section style={{
                padding: '0 24px 100px',
                maxWidth: '900px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2
            }}>
                <p className="mono arch-reveal" style={{
                    fontSize: '11px', color: G, letterSpacing: '0.3em',
                    textTransform: 'uppercase', marginBottom: '40px'
                }}>
                    WHAT_YOU_GET
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px'
                }}>
                    {[
                        { id: '01', title: 'Custom React Architecture', desc: 'No WordPress. No Wix. Hand-written React + Vite — the same stack behind the page you are reading right now.' },
                        { id: '02', title: 'Cinematic Animations', desc: 'GSAP scroll-driven motion, Three.js 3D scenes, micro-interactions that make visitors stop scrolling.' },
                        { id: '03', title: 'Mobile-First Engineering', desc: 'Every breakpoint tested. No horizontal overflow. Sub-3 second load times on 4G connections.' },
                        { id: '04', title: 'Conversion Architecture', desc: 'Strategic content placement, CTA hierarchy, and psychological flow designed to move visitors to action.' },
                        { id: '05', title: 'Full Source Ownership', desc: 'You own every line of code. No vendor lock-in. Deploy anywhere — Vercel, Netlify, your own server.' },
                        { id: '06', title: 'Indian Pricing', desc: 'The same calibre that agencies quote lakhs for — delivered at a fraction, because overhead is zero.' },
                    ].map((item) => (
                        <div key={item.id} className="arch-reveal arch-card" style={{
                            padding: '32px 28px',
                            border: `0.5px solid ${G_BORDER}`,
                            background: G_GLOW,
                            cursor: 'default'
                        }}
                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = G)}
                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = G_BORDER)}
                        >
                            <div className="mono" style={{ fontSize: '10px', color: G_DIM, marginBottom: '12px' }}>
                                SYS_ID: {item.id}
                            </div>
                            <h3 className="heading" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                                {item.title}
                            </h3>
                            <p className="mono" style={{
                                fontSize: '13px', color: '#64748b', lineHeight: 1.6
                            }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Proof Section ── */}
            <section style={{
                padding: '80px 24px 100px',
                maxWidth: '900px',
                margin: '0 auto',
                borderTop: `1px solid ${G_BORDER}`,
                position: 'relative',
                zIndex: 2
            }}>
                <div className="arch-reveal" style={{
                    borderLeft: `2px solid ${G}`,
                    paddingLeft: '24px'
                }}>
                    <p className="mono" style={{
                        fontSize: '11px', color: G, letterSpacing: '0.3em',
                        textTransform: 'uppercase', marginBottom: '16px'
                    }}>
                        PROOF_OF_CONCEPT
                    </p>
                    <h2 className="heading" style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        marginBottom: '20px',
                        lineHeight: 1.15
                    }}>
                        This website is the proof.
                    </h2>
                    <p className="mono" style={{
                        fontSize: '14px', color: '#94a3b8', lineHeight: 1.7,
                        maxWidth: '520px'
                    }}>
                        Three.js particle systems. GSAP scroll-triggered choreography. 
                        React Router SPA navigation. Tailwind design tokens. 
                        All running on a single Vite build — and it was built in days, not months.
                    </p>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="arch-reveal" style={{
                padding: '80px 24px 120px',
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
                zIndex: 2
            }}>
                <h2 className="heading" style={{
                    fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                    marginBottom: '16px',
                    lineHeight: 1.1
                }}>
                    READY TO BUILD?
                </h2>
                <p className="mono" style={{
                    fontSize: '14px', color: '#64748b',
                    maxWidth: '400px',
                    margin: '0 auto 40px'
                }}>
                    Tell us what you need. We'll architect it.
                </p>
                <div className="arch-cta-wrap">
                    <a
                        href="/#contact"
                        className="mono"
                        style={{
                            display: 'inline-block',
                            padding: '16px 48px',
                            border: `1px solid ${G}`,
                            color: G,
                            fontSize: '13px',
                            fontWeight: 'bold',
                            letterSpacing: '0.2em',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            zIndex: 1
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = G;
                            e.currentTarget.style.color = BG;
                            e.currentTarget.style.boxShadow = `0 0 30px rgba(34, 197, 94, 0.25)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = G;
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        INITIATE CONTACT →
                    </a>
                </div>
            </section>

            <Footer theme="green" />
        </div>
    );
};

export default Architecture;
