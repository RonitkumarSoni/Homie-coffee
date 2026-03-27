"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/app/lib/supabase";
import { User } from "@supabase/supabase-js";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "../lib/store";

export function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const { scrollY } = useScroll();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden && !isMobileMenuOpen ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-4 md:px-12 md:py-6 backdrop-blur-md bg-[#00735C]/80 md:bg-[#00735C]/20 border-b border-white/5"
            >
                {/* Logo */}
                <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-wider cursor-pointer z-50 relative">
                    HOMIE
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8 text-xs sm:text-sm font-sans tracking-widest text-white/80 uppercase">
                    <a href="#origins" className="hover:text-white transition-colors">Origins</a>
                    <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
                    <a href="#shop" className="hover:text-white transition-colors">Shop</a>
                </div>

                {/* Actions (Desktop & Mobile) */}
                <div className="flex items-center space-x-2 sm:space-x-4 z-50 relative">
                    <CartButton />
                    
                    <div className="hidden sm:block">
                        {user ? (
                            <Link href="/profile" className="text-xs sm:text-sm font-sans font-bold text-[#00735C] bg-white px-4 sm:px-5 py-2 rounded-full hover:bg-white/90 transition-colors text-center uppercase tracking-wide inline-block">
                                Account
                            </Link>
                        ) : (
                            <Link href="/login" className="text-xs sm:text-sm font-sans font-bold text-[#00735C] bg-white px-4 sm:px-5 py-2 rounded-full hover:bg-white/90 transition-colors text-center uppercase tracking-wide inline-block">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 -mr-2 text-white md:hidden"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-[#005c49] flex flex-col items-center justify-center space-y-8 md:hidden px-6"
                    >
                        <a href="#origins" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-3xl text-white">Origins</a>
                        <a href="#philosophy" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-3xl text-white">Philosophy</a>
                        <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="font-display text-3xl text-white">Shop</a>
                        
                        <div className="w-full h-[1px] bg-white/10 my-4" />
                        
                        {user ? (
                            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-sans font-bold text-[#00735C] w-full bg-white px-5 py-4 rounded-full hover:bg-white/90 transition-colors text-center uppercase tracking-wide">
                                Account
                            </Link>
                        ) : (
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-sans font-bold text-[#00735C] w-full bg-white px-5 py-4 rounded-full hover:bg-white/90 transition-colors text-center uppercase tracking-wide">
                                Sign In
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

function CartButton() {
    const { toggleCart, items } = useCartStore();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <button
            onClick={toggleCart}
            className="relative p-2 text-white hover:text-white/80 transition-colors"
        >
            <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
            {count > 0 && (
                <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    key={count}
                    className="absolute -top-1 -right-1 bg-[#FF4D4D] text-white text-[10px] font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full"
                >
                    {count}
                </motion.span>
            )}
        </button>
    )
}
