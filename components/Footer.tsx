import React, { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface FooterProps {
    theme?: 'crimson' | 'sky' | 'purple' | 'green';
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
    const isPurple = theme === 'purple';
    const isGreen = theme === 'green';
    const accentColor = isGreen ? '#22c55e' : isPurple ? '#a855f7' : isSky ? '#38bdf8' : 'var(--deep-crimson)';
    const borderColor = isGreen ? 'rgba(34, 197, 94, 0.2)' : isPurple ? 'rgba(168, 85, 247, 0.2)' : isSky ? '#1e293b' : '#4a0404';
    const logoColor = isGreen ? '#15803d' : isPurple ? '#7c3aed' : isSky ? '#0ea5e9' : '#4a0404';

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
                    <Link to="/documentation" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ DOCUMENTATION ]</Link>
                    <Link to="/version-logs" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ VERSION_LOGS ]</Link>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <p className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '13px', color: '#666', fontWeight: 'bold', letterSpacing: '0.1em' }}>LEGAL</p>
                    <Link to="/privacy" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ PRIVACY ]</Link>
                    <Link to="/terms" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ TERMS ]</Link>
                    <Link to="/licensing" className="mono" style={{ fontFamily: "'JetBrains Mono', 'Courier New', monospace", fontSize: '14px', color: accentColor, fontWeight: 'bold', textDecoration: 'none', letterSpacing: '0.1em' }}>[ LICENSING ]</Link>
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
                borderTop: `1px solid ${isGreen ? 'rgba(34, 197, 94, 0.12)' : isPurple ? 'rgba(168, 85, 247, 0.12)' : isSky ? '#0f172a' : '#1a1a1a'}`,
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
