import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Hero from '../components/Hero';
import Arsenal from '../components/Arsenal';
import Contact from '../components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
    const [loadStage, setLoadStage] = useState<'VOID' | 'BOOT' | 'SLICE' | 'ACTIVE'>('VOID');
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const t1 = setTimeout(() => setLoadStage('BOOT'), 100);
        const t2 = setTimeout(() => setLoadStage('SLICE'), 2000);
        const t3 = setTimeout(() => setLoadStage('ACTIVE'), 2600);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    useGSAP(() => {
        if (loadStage !== 'ACTIVE') return;

        let spineTween: gsap.core.Tween | null = null;

        const animateSpine = () => {
            // Only animate on PC Tier (> 1200px)
            if (window.innerWidth <= 1200) {
                if (spineTween) {
                    spineTween.kill();
                    spineTween = null;
                }
                return;
            }

            const totalHeight = document.documentElement.scrollHeight;
            const beadHeight = window.innerHeight * 0.25; // 25vh

            if (spineTween) spineTween.kill();

            spineTween = gsap.to(".spine-pulse-bead", {
                y: totalHeight - beadHeight,
                duration: 15,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true
            });
        };

        animateSpine();

        // Recalculate if window resizes
        const handleResize = () => animateSpine();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (spineTween) spineTween.kill();
        };
    }, [loadStage]);

    useEffect(() => {
        if (loadStage !== 'ACTIVE') return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNavbarVisible(!entry.isIntersecting);
            },
            { threshold: 0.05 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        // Handle initial hash scroll after load
        const hash = window.location.hash;
        if (hash) {
            const targetId = hash.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                // Small timeout to ensure everything is rendered and measured correctly
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Clear hash after scroll to prevent repetitive jumping on refresh
                    window.history.replaceState(null, '', window.location.pathname);
                }, 100);
            }
        }

        return () => observer.disconnect();
    }, [loadStage]);

    // Scroll Fix: Override body overflow:hidden from index.html
    React.useLayoutEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'auto'; // Enable scroll for Home

        // Prevent browser from jumping to hash on reload
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        return () => {
            document.body.style.overflow = originalOverflow; // Restore (hidden) on exit
            if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'auto';
            }
        };
    }, []);

    if (loadStage === 'VOID' || loadStage === 'BOOT' || loadStage === 'SLICE') {
        return (
            <div className="home_scope">
                <Loading stage={loadStage} />
            </div>
        );
    }

    return (
        <div className="home_scope">
            <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
                <TheSpine />
                <Header isVisible={isNavbarVisible} />

                <main style={{ position: 'relative', zIndex: 1 }}>
                    <Hero />
                    <Arsenal />
                    <Contact />
                </main>

                <Footer ref={footerRef} />
            </div>
        </div>
    );
};

const TheSpine: React.FC = () => (
    <div className="the-spine-line" style={{
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: '1.5px',
        backgroundColor: '#4a0404',
        zIndex: 0,
        transform: 'translateX(-50%)',
        pointerEvents: 'none'
    }}>
        <div className="spine-pulse-bead" />
    </div>
);

export default Home;
