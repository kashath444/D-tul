import React, { useState, useEffect, useRef } from "react"
import { AnimationState } from "../types"
import Experience from "../components/Experience"
import Overlay from "../components/Overlay"
import Header from "../components/Header"
import Footer from "../components/Footer"
import EntropyFilter from "../components/EntropyFilter"
import ThroughputVisual from "../components/ThroughputVisual"

export default function FirstContact() {
    const [phase, setPhase] = useState<AnimationState>(AnimationState.LOOPING)
    const [isNavbarVisible, setIsNavbarVisible] = useState(true)
    const footerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(AnimationState.SHATTERING), 1500),
            setTimeout(() => setPhase(AnimationState.ACCELERATING), 2000),
            setTimeout(() => setPhase(AnimationState.REVEALED), 3500),
        ]

        return () => timers.forEach(clearTimeout)
    }, [])

    useEffect(() => {
        if (phase !== AnimationState.REVEALED) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsNavbarVisible(!entry.isIntersecting)
            },
            { threshold: 0.05 }
        )

        if (footerRef.current) {
            observer.observe(footerRef.current)
        }

        return () => observer.disconnect()
    }, [phase])

    // Enable scroll for FirstContact as well
    React.useLayoutEffect(() => {
        const originalOverflow = document.body.style.overflow
        document.body.style.overflow = 'auto'
        return () => {
            document.body.style.overflow = originalOverflow
        }
    }, [])

    return (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#020617', overflowX: 'clip' }}>
            <Header isVisible={isNavbarVisible} theme="sky" />

            <main>
                <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
                    <Experience phase={phase} />
                    <Overlay phase={phase} />
                    {/* Vignette */}
                    <div className="pointer-events-none absolute inset-0 z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
                </section>

                <EntropyFilter />
                <ThroughputVisual />
            </main>

            <Footer ref={footerRef} theme="sky" />
        </div>
    )
}
