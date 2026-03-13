import React, { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
    theme?: 'crimson' | 'sky';
}

const Footer = forwardRef<HTMLElement, FooterProps>(({ theme = 'crimson' }, ref) => {
    const location = useLocation();

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        const hash = href.split('#')[1];
        if (!hash) return;

        // If we are on the home page (or the target page of the hash), smooth scroll
        const isHomePage = location.pathname === '/' || location.pathname === `${import.meta.env.BASE_URL}` || location.pathname === `${import.meta.env.BASE_URL}/`;
        const isTargetHome = href.startsWith(`${import.meta.env.BASE_URL}#`) || href.startsWith('#');

        if (isHomePage && isTargetHome) {
            e.preventDefault();
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Update URL without reload
                window.history.pushState(null, '', href);
            }
        }
    };

    const isSky = theme === 'sky';
    const accentColor = isSky ? '#38bdf8' : 'var(--deep-crimson)';
    const borderColor = isSky ? '#1e293b' : '#4a0404';
    const logoColor = isSky ? '#0ea5e9' : '#4a0404';

    return (
        <footer
            ref={ref}
            className="footer-container"
            style={{
                width: '100%',
                minHeight: '70vh',
                backgroundColor: '#050505',
                padding: '120px 60px',
                position: 'relative',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflow: 'hidden'
            }}
        >
            {/* Massive Graphic Logo Background - Responsive */}
            <div className="footer-large-logo glitch-effect" style={{
                position: 'absolute',
                bottom: '-2vw',
                left: '20px',
                fontSize: 'clamp(8rem, 18vw, 25rem)',
                color: logoColor,
                fontWeight: '400',
                lineHeight: '0.7',
                userSelect: 'none',
                pointerEvents: 'none',
                opacity: isSky ? 0.15 : 0.3,
                zIndex: -1,
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em'
            }}>
                DTUL
            </div>

            {/* Link Infrastructure */}
            <div className="footer-links-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '60px',
                width: '100%',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: '#666', fontWeight: 'bold', letterSpacing: '0.1em' }}>NAVIGATION</p>
                    <Link to="/" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ HOME ]</Link>
                    {[
                        { label: 'ARSENAL', href: `${import.meta.env.BASE_URL}#arsenal` },
                        { label: 'CONTACT', href: `${import.meta.env.BASE_URL}#contact` }
                    ].map(l => (
                        <a
                            key={l.label}
                            href={l.href}
                            onClick={(e) => handleNavClick(e, l.href)}
                            className="mono"
                            style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}
                        >
                            [ {l.label} ]
                        </a>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: '#666', fontWeight: 'bold', letterSpacing: '0.1em' }}>RESOURCES</p>
                    {['DOCUMENTATION', 'VERSION_LOGS', 'SYSTEM_STATUS'].map(l => (
                        <a key={l} href="#" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ {l} ]</a>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: '#666', fontWeight: 'bold', letterSpacing: '0.1em' }}>LEGAL</p>
                    {['PRIVACY', 'TERMS', 'LICENSING'].map(l => (
                        <a key={l} href="#" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ {l} ]</a>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: '#666', fontWeight: 'bold', letterSpacing: '0.1em' }}>SOCIAL</p>
                    {[{ label: 'PINTEREST', href: 'https://pin.it/5GedqvzXS' }].map(l => (
                        <a
                            key={l.label}
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono"
                            style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}
                        >
                            [ {l.label} ]
                        </a>
                    ))}
                </div>
            </div>

            {/* Legacy Corner Data Pinning */}
            <div className="footer-corner-data" style={{
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'space-between',
                pointerEvents: 'none',
                borderTop: `1px solid ${isSky ? '#0f172a' : '#1a1a1a'}`,
                paddingTop: '30px'
            }}>
                <div className="mono flicker-metadata" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: accentColor, fontWeight: 'bold', letterSpacing: '0.1em' }}>
                    STATUS: TERMINATED
                </div>
                <div className="mono flicker-metadata" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: accentColor, fontWeight: 'bold', letterSpacing: '0.1em' }}>
                    VELOCITY: 05.85
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';
export default Footer;
