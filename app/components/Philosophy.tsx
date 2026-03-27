"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <section id="philosophy" ref={containerRef} className="relative z-10 bg-[#005c49] overflow-hidden" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
            {/* Content wrapper with image & text */}
            <div className="container mx-auto px-4 sm:px-6 mb-16 sm:mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Image side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden"
                    >
                        <Image
                            src="/images/brewing_process.png"
                            alt="Coffee brewing process"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#005c49]/60 to-transparent" />
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-white/50 mb-4">
                            Our Philosophy
                        </p>
                        <h2 className="font-display text-white/90 leading-tight mb-6" style={{ fontSize: 'var(--text-h2)' }}>
                            Our Philosophy is simple.<br />
                            <span className="text-white/60 italic">We don&apos;t rush perfection.</span>
                        </h2>
                        <p className="text-white/80 font-sans leading-relaxed" style={{ fontSize: 'var(--text-body-lg)' }}>
                            From the volcanic soils of Ethiopia to the high-tech roasters in our lab, every step is deliberate. We believe that great coffee isn&apos;t just made; it&apos;s cultivated, nurtured, and respected.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Kinetic Type */}
            <div className="flex flex-col space-y-4 opacity-[0.07]">
                <motion.div style={{ x: x1 }} className="whitespace-nowrap">
                    <span className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold font-sans uppercase leading-none tracking-tighter text-white">
                        Patience • TIME • Focus •
                    </span>
                </motion.div>
                <motion.div style={{ x: x2 }} className="whitespace-nowrap">
                    <span className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[15rem] font-bold font-serif italic uppercase leading-none tracking-tighter text-white">
                        Tradition • Craft • Soul •
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
