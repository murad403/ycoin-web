'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
        const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3.out' });
        const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power2.out' });
        const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power2.out' });
        const handleMouseMove = (e: MouseEvent) => {
            xDotTo(e.clientX);
            yDotTo(e.clientY);

            xRingTo(e.clientX);
            yRingTo(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-999 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            />
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-999 size-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
            />
        </>
    );
}