"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({
    images,
    onComplete,
}: {
    images: string[];
    onComplete: () => void;
}) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    const brandText = "HOMIE COFFEE";

    useEffect(() => {
        let isMounted = true;
        const total = images.length;

        if (total === 0) {
            onCompleteRef.current();
            return;
        }

        let loadedCount = 0;
        let frameId: number;

        const handleLoad = (resolve: () => void) => {
            loadedCount++;
            if (isMounted) {
                if (frameId) cancelAnimationFrame(frameId);
                frameId = requestAnimationFrame(() => {
                    if (isMounted) {
                        setProgress(Math.round((loadedCount / total) * 100));
                    }
                });
            }
            resolve();
        };

        const loadImages = async () => {
            const promises = images.map((src) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.onload = () => handleLoad(resolve);
                    img.onerror = () => handleLoad(resolve);
                    img.src = src;
                });
            });

            await Promise.all(promises);
            if (isMounted) {
                if (frameId) cancelAnimationFrame(frameId);
                setProgress(100);
                setIsExiting(true);
                setTimeout(() => onCompleteRef.current(), 1200);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [images]);

    // Circle progress
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00735C] text-white overflow-hidden"
        >
            {/* Curtain panels for exit */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#00735C] z-20"
                animate={isExiting ? { y: "-100%" } : { y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#00735C] z-20"
                animate={isExiting ? { y: "100%" } : { y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />

            {/* Ambient animated glow */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full opacity-20"
                style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <div className="relative z-10 flex flex-col items-center space-y-8">
                {/* Circular progress ring with coffee bean */}
                <div className="relative w-28 h-28 flex items-center justify-center">
                    {/* Background ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                        />
                        <motion.circle
                            cx="50" cy="50" r="45"
                            fill="none"
                            stroke="rgba(255,255,255,0.8)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            transition={{ ease: "easeOut", duration: 0.3 }}
                        />
                    </svg>

                    {/* Coffee bean icon */}
                    <motion.svg
                        viewBox="0 0 24 24"
                        className="w-10 h-10 text-white/80"
                        fill="currentColor"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.93 0 3.68.71 5.05 1.86C16.15 7.6 14.22 9 12 9s-4.15-1.4-5.05-3.14A7.95 7.95 0 0 1 12 4zm0 16c-4.41 0-8-3.59-8-8 0-.88.15-1.73.42-2.52C5.82 11.48 8.7 13 12 13s6.18-1.52 7.58-3.52c.27.79.42 1.64.42 2.52 0 4.41-3.59 8-8 8z" />
                    </motion.svg>
                </div>

                {/* Brand text — staggered letter reveal */}
                <div className="flex items-center space-x-[3px] overflow-hidden">
                    {brandText.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1 + i * 0.04,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="font-display text-2xl sm:text-3xl tracking-[0.2em]"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-xs sm:text-sm tracking-[0.3em] uppercase font-sans text-white/50"
                >
                    Pure Origin
                </motion.p>

                {/* Progress text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <span className="text-4xl sm:text-5xl font-display text-white/90 tabular-nums">
                        {progress}
                    </span>
                    <span className="text-lg text-white/40 ml-1 font-sans">%</span>
                </motion.div>

                {/* Loading bar (slim accent) */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-white/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.2 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
