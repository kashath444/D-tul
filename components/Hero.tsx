import React, { useEffect, useState } from 'react';
import './BrutalistStyles.css';

const Hero: React.FC = () => {
    const [isGlitchActive, setIsGlitchActive] = useState(false);

    useEffect(() => {
        const triggerGlitch = () => {
            setIsGlitchActive(true);
            setTimeout(() => setIsGlitchActive(false), 600); // 600ms glitch duration
        };

        // Initial trigger after 200ms
        const initialTimer = setTimeout(triggerGlitch, 200);

        // Repeating trigger every 3500ms
        const interval = setInterval(triggerGlitch, 3500);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    return (
        <section id="hero" className={`brutalist-hero ${isGlitchActive ? 'glitch-active' : ''}`}>
            <div className="hero-main-content">
                <div className="headline-wrapper">
                    <h1 className="hero-headline">
                        <span>TURNING YOUR</span>
                        <span className="glitch-text">QUESTIONS</span>
                        <span>INTO FRAMEWORKS.</span>
                    </h1>
                    <div className="divider-line" />
                </div>

                <aside id="read" className="philosophy-block">
                    <span className="philosophy-label">WE’VE BEEN IN THE TRENCHES</span>
                    <p className="philosophy-body">
                        Every framework we build started as a frustration we faced ourselves.
                        We know the exhaustion of being stalled by small execution doubts and
                        the time wasted searching for answers that don't exist.
                        <br /><br />
                        D-TUL was born from the realization that these “small” frictions are
                        exactly what stop great ideas from growing. We transition execution
                        doubts into rigid, structured frameworks.
                    </p>
                </aside>
            </div>
        </section>
    );
};

export default Hero;

