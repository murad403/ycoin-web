'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable custom cursor on touch/mobile devices
        if (
            typeof window === 'undefined' ||
            window.matchMedia('(pointer: coarse)').matches ||
            window.matchMedia('(max-width: 767px)').matches
        ) {
            return;
        }

        if (!dotRef.current || !ringRef.current) return;

        const xDotTo = gsap.quickTo(dotRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
        const yDotTo = gsap.quickTo(dotRef.current, 'y', { duration: 0.1, ease: 'power3.out' });
        const xRingTo = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power2.out' });
        const yRingTo = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power2.out' });

        let isHoveringInteractive = false;

        const handleMouseMove = (e: MouseEvent) => {
            xDotTo(e.clientX);
            yDotTo(e.clientY);

            xRingTo(e.clientX);
            yRingTo(e.clientY);

            const target = e.target as HTMLElement | null;
            const isInteractive = target
                ? !!target.closest('a, button, [role="button"], input, textarea, select, label, .cursor-pointer')
                : false;

            if (isInteractive !== isHoveringInteractive) {
                isHoveringInteractive = isInteractive;
                if (isInteractive) {
                    gsap.to(ringRef.current, {
                        scale: 1.4,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                    gsap.to(dotRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                } else {
                    gsap.to(ringRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                    gsap.to(dotRef.current, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }
        };

        const handleMouseLeave = () => {
            gsap.to([dotRef.current, ringRef.current], {
                opacity: 0,
                duration: 0.2
            });
        };

        const handleMouseEnter = () => {
            gsap.to([dotRef.current, ringRef.current], {
                opacity: 1,
                duration: 0.2
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="hidden md:block pointer-events-none fixed top-0 left-0 z-9999 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity"
            />
            <div
                ref={ringRef}
                className="hidden md:block pointer-events-none fixed top-0 left-0 z-9999 size-11 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white transition-opacity"
            />
        </>
    );
}