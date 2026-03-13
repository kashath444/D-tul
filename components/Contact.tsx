import React from 'react';

const Contact: React.FC = () => {
    return (
        <section id="contact" style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '80px 20px',
        }}>
            {/* Background Effects */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1
            }}>
                {/* Scanline Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(74, 4, 4, 0.05) 50%)',
                    backgroundSize: '100% 4px',
                    animation: 'scanline-scroll 8s linear infinite'
                }} />

                {/* Horizontal Sweep */}
                <div style={{
                    position: 'absolute',
                    top: '-10%',
                    left: 0,
                    width: '100%',
                    height: '2px',
                    background: 'rgba(74, 4, 4, 0.2)',
                    boxShadow: '0 0 10px rgba(74, 4, 4, 0.1)',
                    animation: 'sweep-pass 10s linear infinite'
                }} />
            </div>

            {/* Content Container */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                width: '100%',
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                gap: 'clamp(40px, 8vw, 80px)'
            }}>
                {/* Headline Group */}
                <div style={{ textAlign: 'left' }}>
                    <h2 className="heading" style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        color: '#fff',
                        lineHeight: '1.1',
                        marginBottom: '30px'
                    }}>
                        got something worth building?<br />
                        skip the small talk.
                        <span style={{
                            display: 'inline-block',
                            width: '0.6em',
                            height: '0.1em',
                            backgroundColor: 'var(--deep-crimson)',
                            marginLeft: '10px',
                            verticalAlign: 'middle',
                            animation: 'blink-cursor 1s step-end infinite'
                        }} />
                    </h2>

                    <p className="mono" style={{
                        color: '#888',
                        fontSize: 'clamp(14px, 2vw, 18px)',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        borderLeft: '2px solid var(--deep-crimson)',
                        paddingLeft: '20px'
                    }}>
                        whether it's a bold product idea or something broken that needs fixing - send the raw details. we'll handle the rest.
                    </p>
                </div>

                {/* CTAs */}
                <div className="contact-actions" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <a href="mailto:contact@dtul.com" className="heading" style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderBottom: '2px solid var(--deep-crimson)',
                        paddingBottom: '5px',
                        transition: 'color 0.3s ease, border-color 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--deep-crimson)';
                            e.currentTarget.style.borderColor = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = 'var(--deep-crimson)';
                        }}
                    >
                        send the details.
                    </a>

                    <a href="#book" className="mono" style={{
                        fontSize: '14px',
                        color: 'var(--deep-crimson)',
                        textDecoration: 'none',
                        letterSpacing: '0.1em',
                        border: '1px solid var(--deep-crimson)',
                        padding: '12px 24px',
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--deep-crimson)';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--deep-crimson)';
                        }}
                    >
                        book a call.
                    </a>
                </div>
            </div>

            {/* Mobile Stack Override Style Block */}
            <style>
                {`
                    @media (max-width: 768px) {
                        #contact .contact-actions {
                            flex-direction: column;
                            align-items: flex-start;
                        }
                    }
                `}
            </style>
        </section>
    );
};

export default Contact;
