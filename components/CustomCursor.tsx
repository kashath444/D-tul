
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
            {/* Horizontal Line */}
            <div className={`absolute left-[-20px] top-0 w-[40px] h-[0.5px] bg-[#4a0404] transition-all duration-300 ${isPointer ? 'scale-x-150' : ''}`} />
            {/* Vertical Line */}
            <div className={`absolute left-0 top-[-20px] w-[0.5px] h-[40px] bg-[#4a0404] transition-all duration-300 ${isPointer ? 'scale-y-150' : ''}`} />
            {/* Center Dot */}
            <div className="absolute left-[-1px] top-[-1px] w-[2px] h-[2px] bg-white rounded-full" />
        </div>
    );
};

export default CustomCursor;
