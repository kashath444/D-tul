import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
    isVisible: boolean;
    theme?: 'crimson' | 'sky' | 'purple' | 'green';
}

const Header: React.FC<HeaderProps> = ({ isVisible, theme = 'crimson' }) => {
    const [isWorkOpen, setIsWorkOpen] = React.useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

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

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const isSky = theme === 'sky';
    const isPurple = theme === 'purple';
    const isGreen = theme === 'green';
    const accentColor = isGreen ? '#22c55e' : isPurple ? '#a855f7' : isSky ? '#38bdf8' : 'var(--deep-crimson)';
    const borderColor = isGreen ? 'rgba(34, 197, 94, 0.2)' : isPurple ? 'rgba(168, 85, 247, 0.2)' : isSky ? '#1e293b' : '#4a0404';
    const glowColor = isGreen ? 'rgba(34, 197, 94, 0.5)' : isPurple ? 'rgba(168, 85, 247, 0.5)' : isSky ? 'rgba(56, 189, 248, 0.5)' : 'var(--deep-crimson)';

    const navLinks = [
        { label: 'WORK', href: `${import.meta.env.BASE_URL}#arsenal`, isDropdown: true },
        { label: 'ABOUT', href: `${import.meta.env.BASE_URL}#read` },
        { label: 'LOGS', href: '/version-logs', isRoute: true },
        { label: 'CONTACT', href: `${import.meta.env.BASE_URL}#contact` }
    ];

    return (
        <header className="header-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '60px',
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            zIndex: 100,
            opacity: isVisible ? 1 : 0,
            pointerEvents: isVisible ? 'auto' : 'none',
            transition: 'opacity 0.4s ease-in-out'
        }}>
            {/* Logo Fix: nowrap and inline-block */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="header-logo">
                    D-TUL
                </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav" style={{ gap: '30px', alignItems: 'center' }}>
                {navLinks.map((item) => (
                    <div key={item.label} style={{ position: 'relative' }}
                        onMouseEnter={() => item.isDropdown && setIsWorkOpen(true)}
                        onMouseLeave={() => item.isDropdown && setIsWorkOpen(false)}
                    >
                        {(item as any).isRoute ? (
                            <Link
                                to={item.href}
                                className="mono"
                                style={{
                                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                                    fontSize: '13px',
                                    color: accentColor,
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    letterSpacing: '0.2em',
                                    transition: 'color 0.2s, text-shadow 0.2s',
                                    padding: '10px 0',
                                    display: 'block'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.textShadow = `0 0 8px ${accentColor}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = accentColor;
                                    e.currentTarget.style.textShadow = 'none';
                                }}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <a
                                href={item.href}
                                className="mono"
                                onClick={(e) => handleNavClick(e, item.href)}
                                style={{
                                    fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                                    fontSize: '13px',
                                    color: (item.isDropdown && isWorkOpen) ? '#fff' : accentColor,
                                    fontWeight: 'bold',
                                    textDecoration: 'none',
                                    letterSpacing: '0.2em',
                                    transition: 'color 0.2s, text-shadow 0.2s',
                                    padding: '10px 0',
                                    display: 'block'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.textShadow = `0 0 8px ${accentColor}`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = (item.isDropdown && isWorkOpen) ? '#fff' : accentColor;
                                    e.currentTarget.style.textShadow = 'none';
                                }}
                            >
                                {item.label}
                            </a>
                        )}

                        {/* Desktop Dropdown for WORK */}
                        {item.isDropdown && isWorkOpen && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.9)', /* Darker background */
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${borderColor}`,
                                padding: '10px 0',
                                minWidth: '180px', /* Increased width */
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                            }}>
                                <DropdownItem to="/first-contact" label="FIRST CONTACT" onClick={() => setIsWorkOpen(false)} theme={theme} />
                                <DropdownItem to="/ai-workflows" label="AI WORKFLOWS" onClick={() => setIsWorkOpen(false)} theme={theme} />
                                <DropdownItem to="/architecture" label="ARCHITECTURE" onClick={() => setIsWorkOpen(false)} theme={theme} />
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Mobile Nav Toggle */}
            <button
                className="mobile-nav-toggle mono"
                onClick={toggleMobileMenu}
                style={{
                    background: 'none',
                    border: `1px solid ${accentColor}`,
                    color: accentColor,
                    padding: '8px 12px',
                    fontSize: '12px',
                    cursor: 'pointer'
                }}
            >
                {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
            </button>

            {/* Mobile Fullscreen Menu */}
            {isMobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: '60px',
                    left: 0,
                    width: '100vw',
                    height: 'calc(100vh - 60px)',
                    backgroundColor: 'rgba(0,0,0,0.95)',
                    backdropFilter: 'blur(15px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    zIndex: 99
                }}>
                    {navLinks.map((item) => (
                        <div key={item.label} style={{ textAlign: 'center' }}>
                            {(item as any).isRoute ? (
                                <Link
                                    to={item.href}
                                    className="heading"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        fontSize: '2rem',
                                        color: '#fff',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <a
                                    href={item.href}
                                    className="heading"
                                    onClick={(e) => {
                                        handleNavClick(e, item.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    style={{
                                        fontSize: '2rem',
                                        color: '#fff',
                                        textDecoration: 'none'
                                    }}
                                >
                                    {item.label}
                                </a>
                            )}
                            {item.isDropdown && (
                                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <Link
                                        to="/first-contact"
                                        className="mono"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}
                                    >
                                        ↳ FIRST CONTACT
                                    </Link>
                                    <Link
                                        to="/ai-workflows"
                                        className="mono"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}
                                    >
                                        ↳ AI WORKFLOWS
                                    </Link>
                                    <Link
                                        to="/architecture"
                                        className="mono"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{ fontSize: '14px', color: '#888', textDecoration: 'none' }}
                                    >
                                        ↳ ARCHITECTURE
                                    </Link>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;

const DropdownItem: React.FC<{ to: string; label: string; onClick: () => void; theme: 'crimson' | 'sky' | 'purple' | 'green' }> = ({ to, label, onClick, theme }) => (
    <Link to={to} className="mono" style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        padding: '10px 20px',
        fontSize: '11px',
        color: '#888',
        textDecoration: 'none',
        display: 'block',
        whiteSpace: 'nowrap',
        transition: 'color 0.2s, background 0.2s',
        letterSpacing: '0.1em'
    }}
        onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.backgroundColor = theme === 'green' ? 'rgba(34, 197, 94, 0.2)' : theme === 'purple' ? 'rgba(168, 85, 247, 0.2)' : theme === 'sky' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(74, 4, 4, 0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888';
            e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onClick={onClick}
    >
        {label}
    </Link>
);
