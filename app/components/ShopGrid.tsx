"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "../lib/store";
import { Plus } from "lucide-react";

const ALL_PRODUCTS = [
    {
        id: "p1",
        name: "Morning Fog",
        type: "Light Roast",
        price: 22.00,
        image: "/images/product_morning_fog_1768567523783.png",
        desc: "Notes of jasmine and citrus."
    },
    {
        id: "p2",
        name: "Neon Roast",
        type: "Medium Roast",
        price: 24.00,
        image: "/images/product_neon_roast_1768567547372.png",
        desc: "Bright acidity with a smooth finish."
    },
    {
        id: "p3",
        name: "Velvet Night",
        type: "Dark Roast",
        price: 22.00,
        image: "/images/product_velvet_night_1768567567737.png",
        desc: "Deep chocolate and caramel tones."
    },
    {
        id: "p4",
        name: "Ethiopian Yirgacheffe",
        type: "Single Origin",
        price: 28.00,
        image: "/images/product_ethiopian.png",
        desc: "Floral and tea-like body."
    },
    {
        id: "p5",
        name: "Colombian Huila",
        type: "Single Origin",
        price: 26.00,
        image: "/images/product_colombian.png",
        desc: "Sweet nuts and red apple."
    },
    {
        id: "p6",
        name: "Espresso Blend #9",
        type: "Espresso",
        price: 25.00,
        image: "/images/product_espresso.png",
        desc: "Perfect for crema lovers."
    },
];

import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase";

export function ShopGrid() {
    const addItem = useCartStore((state) => state.addItem);
    const router = useRouter();
    const supabase = createClient();

    const handleAddToCart = async (product: { id: string; name: string; type: string; price: number; image: string; desc: string }) => {
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
        <section id="shop" className="relative z-10 bg-[#002b22]" style={{ paddingTop: 'var(--section-py)', paddingBottom: 'var(--section-py)' }}>
            <div className="container mx-auto" style={{ paddingLeft: 'var(--container-px)', paddingRight: 'var(--container-px)' }}>
                <div className="mb-10 sm:mb-16 text-center">
                    <p className="font-sans tracking-[0.25em] uppercase text-white/50 mb-3" style={{ fontSize: 'var(--text-xs)' }}>
                        Shop
                    </p>
                    <h2 className="font-display text-white mb-3 sm:mb-4" style={{ fontSize: 'var(--text-h2)' }}>
                        The Collection
                    </h2>
                    <p className="text-white/60 font-sans max-w-2xl mx-auto" style={{ fontSize: 'var(--text-body)' }}>
                        Explore our full range of ethically sourced, precision roasted beans.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {ALL_PRODUCTS.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-white/5 border border-white/5 rounded-2xl p-4 sm:p-6 group hover:bg-white/10 transition-all duration-300"
                        >
                            <div className="relative h-48 sm:h-56 lg:h-64 w-full mb-4 sm:mb-6 flex items-center justify-center">
                                <div className="absolute inset-0 bg-[#00735C]/20 rounded-full blur-3xl scale-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-display text-lg sm:text-xl text-white">{product.name}</h3>
                                    <p className="text-white/40 font-bold uppercase tracking-widest" style={{ fontSize: 'var(--text-xs)' }}>{product.type}</p>
                                </div>
                                <span className="text-white font-mono font-bold text-sm sm:text-base">${product.price.toFixed(2)}</span>
                            </div>

                            <p className="text-white/60 mb-4 sm:mb-6" style={{ fontSize: 'var(--text-sm)' }}>{product.desc}</p>

                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full py-2.5 sm:py-3 bg-white/10 hover:bg-[#00735C] text-white rounded-lg flex items-center justify-center space-x-2 font-bold uppercase tracking-wider transition-colors"
                                style={{ fontSize: 'var(--text-xs)' }}
                            >
                                <Plus size={14} />
                                <span>Add to Cart</span>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
