import React from 'react';
import { Link } from 'react-router-dom';

const Arsenal: React.FC = () => {
    return (
        <section id="arsenal" style={{
            padding: '100px 20px',
            position: 'relative',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className="tech-reveal" style={{ marginBottom: '80px', textAlign: 'center', animationDelay: '0.4s' }}>
                    <h2 className="heading" style={{ fontSize: '3.5rem', color: '#fff' }}>THE ARSENAL</h2>
                    <div className="mono" style={{ fontSize: '13px', color: 'var(--deep-crimson)', fontWeight: 'bold', letterSpacing: '0.4em' }}>
                        EXPERTISE_BASED_ASSETS
                    </div>
                </div>

                <div className="tech-reveal arsenal-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', /* Reduced min-width for 300px support */
                    gap: '20px',
                    animationDelay: '0.5s'
                }}>
                    <Link to="/first-contact" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <ProductCard
                            id="01"
                            title="Handbook First Contact"
                            desc="The foundational logic of the D-TUL ecosystem. Structural clarity for high-fidelity projects."
                            statusText="ACCESS NOW"
                        />
                    </Link>
                    <Link to="/ai-workflows" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <ProductCard
                            id="02"
                            title="AI Workflows"
                            desc="Practical frameworks for integrating machine intelligence into human execution streams."
                            statusText="COMING SOON"
                            isDimmed
                        />
                    </Link>
                    <Link to="/architecture" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <ProductCard
                            id="03"
                            title="Landing Page Architecture"
                            desc="High-impact structural systems designed for conversion through absolute clarity."
                            statusText="COMING SOON"
                            isDimmed
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

const ProductCard: React.FC<{ id: string; title: string; desc: string; statusText?: string; isDimmed?: boolean }> = ({ id, title, desc, statusText, isDimmed }) => {
    return (
        <div className="product-card"
            style={{
                height: '100%', /* Ensure full height in grid */
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between', /* Distribute content */
                padding: '60px 40px',
                background: '#000',
                border: `0.5px solid #4a0404`,
                position: 'relative',
                transition: 'border-color 0.3s ease',
                opacity: isDimmed ? 0.7 : 1
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--deep-crimson)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#4a0404')}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div className="mono" style={{ fontSize: '10px', color: '#4a0404' }}>
                    SYS_ID: {id}
                </div>
                {statusText && (
                    <div className="mono" style={{ fontSize: '10px', color: 'var(--deep-crimson)', letterSpacing: '0.1em' }}>
                        {statusText}
                    </div>
                )}
            </div>
            <h3 className="heading" style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '15px' }}>
                {title}
            </h3>
            <div className="mono" style={{ color: '#888', lineHeight: '1.6', fontSize: '14px', fontWeight: '400' }}>
                {desc}
            </div>
        </div>
    );
};

export default Arsenal;
