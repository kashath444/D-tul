import React, { useState, useEffect } from 'react';

interface LoadingProps {
    stage: 'VOID' | 'BOOT' | 'SLICE' | 'ACTIVE';
}

const Loading: React.FC<LoadingProps> = ({ stage }) => {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        if (stage === 'BOOT') {
            const interval = setInterval(() => {
                setPercent(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + Math.floor(Math.random() * 8) + 1;
                });
            }, 80);
            return () => clearInterval(interval);
        }
    }, [stage]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            overflow: 'hidden'
        }}>
            {/* Growing Spine Slicing Through */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: '1.5px',
                height: stage === 'SLICE' ? '100%' : '0%',
                background: '#4a0404',
                transform: 'translate(-50%, -50%)',
                transition: stage === 'SLICE' ? 'height 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                boxShadow: '0 0 15px #4a0404'
            }} />

            {/* Boot Counter */}
            {stage === 'BOOT' && percent < 100 && (
                <div className="mono" style={{
                    fontSize: '10px',
                    color: '#4a0404',
                    textAlign: 'center',
                    letterSpacing: '0.2em'
                }}>
                    SYSTEM_LOAD: [{percent.toString().padStart(2, '0')}%]
                </div>
            )}

            {percent >= 100 && stage === 'BOOT' && (
                <div className="mono" style={{
                    fontSize: '10px',
                    color: '#4a0404',
                    textAlign: 'center',
                    letterSpacing: '0.2em'
                }}>
                    SYSTEM_LOAD: [100%]
                </div>
            )}
        </div>
    );
};

export default Loading;
