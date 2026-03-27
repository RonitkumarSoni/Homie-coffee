"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "../lib/store";

const PRODUCTS = [
    {
        id: "p1",
        name: "Morning Fog",
        type: "Light Roast",
        price: 22.00,
        color: "from-gray-700 to-gray-900",
        image: "/images/product_morning_fog_1768567523783.png"
    },
    {
        id: "p2",
        name: "Neon Roast",
        type: "Medium Roast",
        price: 24.00,
        color: "from-[#FF4D4D] to-[#990000]",
        image: "/images/product_neon_roast_1768567547372.png"
    },
    {
        id: "p3",
        name: "Velvet Night",
        type: "Dark Roast",
        price: 22.00,
        color: "from-[#2C3E50] to-[#000000]",
        image: "/images/product_velvet_night_1768567567737.png"
    },
    {
        id: "p7",
        name: "Golden Hour",
        type: "Espresso Blend",
        price: 26.00,
        color: "from-[#FBBF24] to-[#B45309]",
        image: "/images/product_golden_hour.png"
    },
];

import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";

export function ProductCarousel() {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();
    const supabase = createClient();

    const handleAddToCart = async (product: { id: string; name: string; type: string; price: number; image: string }) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            router.push("/login");
            return;
        }

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            roastType: product.type
        });
    };

    return (
        <section className="relative z-10 bg-[#00735C] overflow-hidden" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
            <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-16 text-center">
                <p className="font-sans tracking-[0.25em] uppercase text-white/50 mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                    Featured
                </p>
                <h2 className="font-display text-white" style={{ fontSize: 'var(--text-h2)' }}>
                    Featured Roasts
                </h2>
            </div>

            <div className="flex overflow-x-auto pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 space-x-4 sm:space-x-6 md:space-x-8 no-scrollbar snap-x snap-mandatory">
                {PRODUCTS.map((product) => (
                    <motion.div
                        key={product.name}
                        className="flex-shrink-0 w-72 sm:w-80 md:w-96 snap-center"
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div
                            onClick={() => handleAddToCart(product)}
                            className={`h-[400px] sm:h-[450px] md:h-[500px] w-full rounded-3xl bg-gradient-to-br ${product.color} relative p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden group cursor-pointer`}
                        >
                            {/* Background/Image Layer */}
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>

                            <div className="relative z-10 text-right">
                                <span className="font-sans font-bold text-white/90 text-lg sm:text-xl bg-black/20 backdrop-blur-md px-4 py-1 rounded-full">
                                    ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <div className="relative z-10 bg-black/40 backdrop-blur-sm p-3 sm:p-4 rounded-xl group-active:scale-95 transition-transform">
                                <h3 className="font-display text-2xl sm:text-3xl text-white mb-1">{product.name}</h3>
                                <p className="text-white/80 font-sans uppercase tracking-widest text-[10px] sm:text-xs mb-2">{product.type}</p>
                                <div className="w-full py-2 bg-white/10 rounded-lg text-center text-xs sm:text-sm font-bold text-white uppercase tracking-wider group-hover:bg-white group-hover:text-black transition-colors">
                                    Add to Cart
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
