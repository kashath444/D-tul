
import React, { useState, useEffect } from 'react';

const CornerReadouts: React.FC = () => {
    const [time, setTime] = useState('');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            const ms = Math.floor(now.getMilliseconds() / 10).toString().padStart(2, '0');
            setTime(`${h}:${m}:${s}:${ms}`);
        };
        const timer = setInterval(updateTime, 40);

        const updateMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', updateMouse);

        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', updateMouse);
        };
    }, []);

    const readoutStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 100,
        fontSize: '9px',
        color: '#666',
        letterSpacing: '0.2em',
        textTransform: 'uppercase'
    };

    return (
        <>
            {/* Top Left */}
            <div className="mono" style={{ ...readoutStyle, top: '30px', left: '30px' }}>
                STATUS: <span style={{ color: '#4a0404' }}>TERMINAL_ACTIVE</span>
            </div>

            {/* Top Right */}
            <div className="mono" style={{ ...readoutStyle, top: '30px', right: '30px' }}>
                TIME: <span style={{ color: '#fff' }}>{time}</span>
            </div>

            {/* Bottom Right */}
            <div className="mono" style={{ ...readoutStyle, bottom: '30px', right: '30px', textAlign: 'right' }}>
                COORDINATES: <span style={{ color: '#fff' }}>X_{mousePos.x} Y_{mousePos.y}</span>
            </div>

            {/* Bottom Left */}
            <div className="mono" style={{ ...readoutStyle, bottom: '30px', left: '30px' }}>
                SIGNAL_STRENGTH: 99.8%
            </div>
        </>
    );
};

export default CornerReadouts;
