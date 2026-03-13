
import React, { useEffect, useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className, delay = 0 }) => {
    const [displayValue, setDisplayValue] = useState('');
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        let timer: any;
        const startEffect = () => {
            let counter = 0;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

            const interval = setInterval(() => {
                setIsGlitching(true);
                const scrambled = text
                    .split('')
                    .map((char, index) => {
                        if (index < counter) return char;
                        return characters.charAt(Math.floor(Math.random() * characters.length));
                    })
                    .join('');

                setDisplayValue(scrambled);

                if (counter >= text.length) {
                    clearInterval(interval);
                    setIsGlitching(false);
                    setDisplayValue(text);
                }
                counter += 0.15;
            }, 40);
        };

        timer = setTimeout(startEffect, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [text, delay]);

    return (
        <span className={`${className} ${isGlitching ? 'text-[#4a0404]' : ''} mono`}>
            {displayValue}
        </span>
    );
};

export default GlitchText;
