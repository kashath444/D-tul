import React from 'react';

const Manifest: React.FC = () => {
    return (
        <section
            style={{
                padding: '250px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh'
            }}
        >
            <div className="tech-reveal" style={{ maxWidth: '850px', width: '100%', animationDelay: '0.15s' }}>
                <h2 className="mono" style={{
                    fontSize: '13px',
                    letterSpacing: '0.3em',
                    color: 'var(--deep-crimson)',
                    fontWeight: 'bold',
                    marginBottom: '50px',
                    textTransform: 'uppercase'
                }}>
                    WE’VE BEEN IN THE TRENCHES
                </h2>

                <div className="mono" style={{
                    fontSize: '1.5rem',
                    lineHeight: '1.8',
                    color: '#ffffff',
                    fontWeight: '400',
                    letterSpacing: '0.5px'
                }}>
                    <p style={{ marginBottom: '50px' }}>
                        Every framework we build started as a frustration we faced ourselves. We know the exhaustion of being stalled by small execution doubts and the time wasted searching for answers that don't exist.
                    </p>
                    <p style={{ color: '#888888' }}>
                        D-TUL was born from the realization that these 'small' frictions are exactly what stop great ideas from growing. We transition execution doubts into rigid, structured frameworks.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Manifest;
