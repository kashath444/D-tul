import React, { useEffect, useRef, useState } from 'react';

const categories = [
    { id: 1, title: 'IDEA', items: ['Unstructured Thought', 'Raw Hypothesis', 'Creative Burst'] },
    { id: 2, title: 'BUILD', items: ['Prototype Logic', 'Systems Map', 'Architecture'] },
    { id: 3, title: 'TEST', items: ['Edge Cases', 'Load Bearing', 'Failure Points'] },
    { id: 4, title: 'SCALE', items: ['Distributed load', 'Optimization', 'Efficiency'] },
    { id: 5, title: 'OPERATE', items: ['Maintenance', 'Live Metrics', 'Observability'] },
    { id: 6, title: 'EVOLVE', items: ['Next Iteration', 'Feedback Loop', 'Growth'] },
];

const NoiseToStructure: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            // Since FirstContact uses overflowX: 'clip', standard position: sticky works
            // But we need to calculate scroll progress accurately.
            // Bounding client rect top goes from 0 to negative height as we scroll down.
            const rect = containerRef.current.getBoundingClientRect();

            // If the top of the 500vh container hasn't reached the top of the viewport yet
            if (rect.top > window.innerHeight) {
                setProgress(0);
                return;
            }

            // The total amount of scrollable space while this section is "sticky"
            const totalScroll = rect.height - window.innerHeight;

            // We start counting progress when the top of the container hits the top of the viewport.
            // But to make the animation feel natural, let's start it slightly earlier or exactly when it hits.
            const currentScroll = Math.max(0, -rect.top);

            const p = currentScroll / totalScroll;
            setProgress(Math.max(0, Math.min(1, p)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Animation timeline based on scroll progress (0 to 1)
    const isSnapped = progress > 0.15;
    const isFocused = progress > 0.25;
    const isCompressed = progress > 0.40;
    const isCleanBreak = progress > 0.60;
    const isDualPathReady = progress > 0.70;
    const isFinalAuth = progress > 0.90;

    return (
        <section ref={containerRef} style={{ height: '500vh', position: 'relative', background: '#020617' }}>
            <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

                {/* Foundation: The Coordinate Grid */}
                <div style={{
                    position: 'absolute',
                    inset: '-10%',
                    backgroundSize: '40px 40px',
                    backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
                    backgroundColor: '#020617',
                    transform: `translateY(${progress * 100}px)`, // Grid Parallax
                    zIndex: 0
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',
                    fontFamily: 'monospace'
                }}>
                    {/* Phase 1, 2, 3: Entropy Sequence & Compression */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '20px',
                        width: '100%',
                        maxWidth: '1200px',
                        transition: 'transform 1s cubic-bezier(0, 0, 0.2, 1), opacity 0.5s cubic-bezier(0, 0, 0.2, 1)',
                        transform: isCleanBreak ? 'translateY(-100vh)' : 'translateY(0)',
                        opacity: isCleanBreak ? 0 : 1,
                        position: 'absolute',
                        top: isCompressed ? '15%' : '50%',
                        marginTop: isCompressed ? '0' : '-100px'
                    }}>
                        {categories.map((cat, i) => {
                            // Calculate scattered positions for the "Chaos" state
                            const scatterX = (i % 2 === 0 ? -1 : 1) * (150 + i * 40);
                            const scatterY = (i % 3 === 0 ? -1 : 1) * (150 + i * 30);

                            return (
                                <div key={cat.id} className="nts-module" style={{
                                    flex: '1 1 min(100%, 150px)',
                                    transition: 'all 1s cubic-bezier(0, 0, 0.2, 1)',
                                    transform: isSnapped ? 'translate(0, 0)' : `translate(${scatterX}px, ${scatterY}px)`,
                                    opacity: isFocused ? 1 : 0.2,
                                    filter: isFocused ? 'blur(0px)' : 'blur(4px)',
                                    border: isCompressed ? '1px solid #1e293b' : '1px solid transparent',
                                    background: isCompressed ? '#020617' : 'transparent',
                                    padding: isCompressed ? '16px' : '0',
                                    overflow: 'hidden',
                                    maxHeight: isCompressed ? '80px' : '200px',
                                    color: '#fff',
                                    cursor: isCompressed ? 'pointer' : 'default'
                                }}>
                                    <h3 style={{
                                        fontFamily: 'monospace',
                                        borderBottom: isCompressed ? '1px solid #1e293b' : 'none',
                                        paddingBottom: '8px',
                                        marginBottom: '12px',
                                        fontSize: '14px',
                                        letterSpacing: '2px',
                                        textTransform: 'uppercase',
                                        color: '#E0E0E0'
                                    }}>{cat.title}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {cat.items.map((item, j) => (
                                            <div key={j} style={{ color: '#888', fontSize: '12px', transition: 'color 0.3s' }} className="hover:text-white">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .nts-module {
                            transition: max-height 0.6s cubic-bezier(0, 0, 0.2, 1), background 0.3s cubic-bezier(0, 0, 0.2, 1) !important;
                        }
                        .nts-module:hover {
                            max-height: 200px !important;
                            background: #0f172a !important;
                        }
                        @media (max-width: 768px) {
                            .nts-dual-path {
                                flex-direction: column;
                                gap: 40px;
                            }
                            .nts-path-card {
                                width: 100% !important;
                            }
                        }
                    `}} />

                    {/* Phase 4 & 5: Clean Break & Dual Path Logic */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: '1200px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: isCleanBreak ? 'auto' : 'none'
                    }}>

                        {/* The Filter Transition */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '2px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '1px',
                                background: '#1e293b',
                                transform: `scaleX(${isCleanBreak ? 1 : 0})`,
                                transition: 'transform 1s cubic-bezier(0, 0, 0.2, 1)'
                            }} />

                            <div style={{
                                position: 'absolute',
                                color: '#fff',
                                background: '#020617',
                                padding: '0 20px',
                                opacity: isCleanBreak && !isDualPathReady ? 1 : 0,
                                letterSpacing: isCleanBreak ? '12px' : '2px',
                                transition: 'all 1.5s cubic-bezier(0, 0, 0.2, 1)',
                                fontSize: '18px',
                                whiteSpace: 'nowrap',
                                textTransform: 'uppercase'
                            }}>
                                The Decision Filter
                            </div>
                        </div>

                        {/* Dual Path */}
                        <div className="nts-dual-path" style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            padding: '60px 20px 0',
                            opacity: isDualPathReady ? 1 : 0,
                            transition: 'opacity 1s cubic-bezier(0, 0, 0.2, 1)',
                            transform: isDualPathReady ? 'translateY(0)' : 'translateY(20px)'
                        }}>
                            {/* Creator Path (Left) */}
                            <div className="nts-path-card" style={{ width: '45%' }}>
                                <div style={{ border: '1px solid #333', padding: '32px', background: '#050505', position: 'relative' }}>
                                    <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '16px', letterSpacing: '2px' }}>CREATOR.PATH</h4>
                                    <p style={{ color: '#888', fontSize: '12px', marginBottom: '24px' }}>Validating the unknown.</p>

                                    <div style={{ borderLeft: '1px dotted #555', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '7px', height: '7px', background: '#1e293b', borderRadius: '50%' }} />
                                            <div style={{ fontSize: '12px', color: '#ccc' }}>Hypothesis Generation</div>
                                            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Defining the variance.</div>
                                        </div>
                                        <div style={{ position: 'relative' }}>
                                            <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '7px', height: '7px', background: '#1e293b', borderRadius: '50%' }} />
                                            <div style={{ fontSize: '12px', color: '#ccc' }}>Variable Testing</div>
                                            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>Isolating structural points.</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Operator Path (Right) */}
                            <div className="nts-path-card" style={{ width: '45%' }}>
                                <div style={{ border: '1px solid #333', padding: '32px', background: '#050505', position: 'relative' }}>
                                    <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '16px', letterSpacing: '2px', textAlign: 'right' }}>OPERATOR.PATH</h4>
                                    <p style={{ color: '#888', fontSize: '12px', marginBottom: '24px', textAlign: 'right' }}>Scaling the known.</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ fontSize: '12px', color: '#ccc', flexShrink: 0 }}>NODE.A</div>
                                            <div style={{ flex: 1, height: '1px', background: '#1e293b', position: 'relative' }}>
                                                <div style={{ position: 'absolute', right: 0, top: '-3px', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #555' }} />
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#666', flexShrink: 0 }}>System Sync</div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ fontSize: '12px', color: '#ccc', flexShrink: 0 }}>NODE.B</div>
                                            <div style={{ flex: 1, height: '1px', background: '#1e293b', position: 'relative' }}>
                                                <div style={{ position: 'absolute', right: 0, top: '-3px', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #555' }} />
                                            </div>
                                            <div style={{ fontSize: '10px', color: '#666', flexShrink: 0 }}>Throughput</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Final Authority CTA */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        opacity: isFinalAuth ? 1 : 0,
                        transform: isFinalAuth ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1s cubic-bezier(0, 0, 0.2, 1)',
                        pointerEvents: isFinalAuth ? 'auto' : 'none'
                    }}>
                        <button style={{
                            border: '1px solid #fff',
                            padding: '12px 32px',
                            background: 'transparent',
                            color: '#fff',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            letterSpacing: '2px',
                            transition: 'background 0.3s cubic-bezier(0, 0, 0.2, 1), color 0.3s cubic-bezier(0, 0, 0.2, 1)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.color = '#000';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.color = '#fff';
                            }}>
                            Access the System
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default NoiseToStructure;
