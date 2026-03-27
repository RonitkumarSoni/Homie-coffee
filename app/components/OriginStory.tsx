"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ORIGINS = [
    {
        country: "Ethiopia",
        region: "Yirgacheffe",
        altitude: "1,750 – 2,200m",
        note: "Jasmine • Lemon • Bergamot",
        color: "bg-[#1A4D2E]",
        image: "/images/origin_ethiopia_1768567444673.png",
        delay: 0
    },
    {
        country: "Colombia",
        region: "Huila",
        altitude: "1,500 – 2,000m",
        note: "Caramel • Apple • Nut",
        color: "bg-[#4E342E]",
        image: "/images/origin_colombia_1768567480328.png",
        delay: 0.1
    },
    {
        country: "Kenya",
        region: "Nyeri",
        altitude: "1,600 – 2,300m",
        note: "Blackcurrant • Tomato • Wine",
        color: "bg-[#3E2723]",
        image: "/images/origin_kenya_1768567502669.png",
        delay: 0.2
    }
];

export function OriginStory() {
    return (
        <section id="origins" className="relative z-10 bg-[#004d3d] text-white" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
            <div className="container mx-auto" style={{ paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
                <div className="mb-10 sm:mb-16">
                    <h3 className="font-sans tracking-[0.2em] uppercase opacity-60 mb-3 sm:mb-4" style={{ fontSize: 'var(--text-xs)' }}>
                        Sourcing
                    </h3>
                    <h2 className="font-display" style={{ fontSize: 'var(--text-h2)' }}>
                        Origins of Excellence.
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 items-start">
                    {ORIGINS.map((origin) => (
                        <motion.div
                            key={origin.country}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: origin.delay }}
                            className="flex flex-col group"
                        >
                            <div className={`w-full h-56 sm:h-64 md:h-72 lg:h-80 ${origin.color} rounded-2xl mb-4 sm:mb-6 relative overflow-hidden`}>
                                <Image
                                    src={origin.image}
                                    alt={origin.country}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10">
                                    <div className="text-[10px] sm:text-xs font-sans border border-white/30 rounded-full px-3 py-1 inline-block backdrop-blur-sm">
                                        Altitude: {origin.altitude}
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-display text-xl sm:text-2xl mb-1">{origin.country}</h3>
                            <p className="font-sans opacity-60 uppercase tracking-wider mb-2" style={{ fontSize: 'var(--text-xs)' }}>
                                {origin.region}
                            </p>
                            <p className="text-white/80 italic font-serif text-sm sm:text-base">{origin.note}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
