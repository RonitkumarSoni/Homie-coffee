"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useMotionValueEvent, MotionValue } from "framer-motion";

const FRAME_COUNT = 142;

export default function CoffeeScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, FRAME_COUNT]);

    // Load images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Draw Logic
    useMotionValueEvent(frameIndex, "change", (latest) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const index = Math.min(Math.max(Math.floor(latest) - 1, 0), FRAME_COUNT - 1);
        const img = images[index];

        if (!img) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgRatio = img.width / img.height;
        const canvasRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgRatio;
            offsetX = 0;
            offsetY = (canvasHeight - drawHeight) / 2;
        } else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgRatio;
            offsetY = 0;
            offsetX = (canvasWidth - drawWidth) / 2;
        }

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    });

    // Handle Canvas Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[600vh] bg-[#00735C]">
            <canvas
                ref={canvasRef}
                className="sticky top-0 h-screen w-full object-contain"
            />

            {/* Text Overlays */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">

                <ScrollOverlay start={0} end={0.15} progress={scrollYProgress}>
                    <div className="text-center px-4">
                        <h1 className="font-display text-shadow-heavy" style={{ fontSize: 'var(--text-display)' }}>
                            HOMIE Coffee.
                        </h1>
                        <p className="text-base sm:text-lg md:text-2xl text-white/70 font-sans tracking-[0.25em] uppercase mt-4">
                            Pure Origin.
                        </p>
                    </div>
                </ScrollOverlay>

                <ScrollOverlay start={0.25} end={0.4} progress={scrollYProgress} align="left">
                    <div className="max-w-xl px-6 sm:pl-10 md:pl-20">
                        <h2 className="font-display text-shadow text-white/90 mb-4 sm:mb-6" style={{ fontSize: 'var(--text-h2)' }}>
                            The Journey Begins.<br />
                            <span className="italic text-white/60">The Cherry.</span>
                        </h2>
                        <p className="text-white/80 font-sans leading-relaxed" style={{ fontSize: 'var(--text-body-lg)' }}>
                            Hand-picked at peak ripeness from high-altitude estates. Every great cup starts with a perfect cherry.
                        </p>
                    </div>
                </ScrollOverlay>

                <ScrollOverlay start={0.50} end={0.65} progress={scrollYProgress} align="right">
                    <div className="max-w-xl px-6 sm:pr-10 md:pr-20 ml-auto text-right">
                        <h2 className="font-display text-shadow text-white/90 mb-4 sm:mb-6" style={{ fontSize: 'var(--text-h2)' }}>
                            Roasted for Depth.<br />
                            <span className="italic text-white/60">Ground for Flavor.</span>
                        </h2>
                        <p className="text-white/80 font-sans leading-relaxed" style={{ fontSize: 'var(--text-body-lg)' }}>
                            Precision roasting unlocks hidden notes of chocolate and citrus. Perfectly ground to extract every ounce of soul.
                        </p>
                    </div>
                </ScrollOverlay>

                <ScrollOverlay start={0.80} end={0.98} progress={scrollYProgress}>
                    <div className="text-center px-4">
                        <h2 className="font-display text-shadow-heavy text-white/90 mb-6 sm:mb-8" style={{ fontSize: 'var(--text-h1)' }}>
                            Made for the Homies.
                        </h2>
                        <button className="pointer-events-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#00735C] font-sans font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 rounded-full text-sm sm:text-base hover:scale-105 hover:shadow-2xl">
                            Order Now
                        </button>
                    </div>
                </ScrollOverlay>

            </div>
        </div>
    );
}

// Helper for scroll opacity using ranges
interface ScrollOverlayProps {
    start: number;
    end: number;
    progress: MotionValue<number>; // Replaced any with MotionValue<number>
    children: React.ReactNode;
    align?: "center" | "left" | "right";
}

function ScrollOverlay({ start, end, progress, children, align = "center" }: ScrollOverlayProps) {
    const opacity = useTransform(progress,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(progress,
        [start, end],
        [50, -50]
    );

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute inset-0 flex items-center ${align === 'center' ? 'justify-center' :
                    align === 'left' ? 'justify-start' : 'justify-end'
                }`}
        >
            {children}
        </motion.div>
    );
}
