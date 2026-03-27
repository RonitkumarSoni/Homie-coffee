"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "../../lib/store";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function CartSidebar() {
    const { isOpen, toggleCart, items, removeItem, updateQuantity } = useCartStore();

    const subtotal = items.reduce((acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full md:w-[450px] bg-[#002b22] shadow-2xl border-l border-white/10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-2xl font-serif text-white">Your Cart</h2>
                            <button
                                onClick={toggleCart}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-white/50 space-y-4">
                                    <ShoppingBag size={48} />
                                    <p className="font-sans text-lg">Your cart is empty.</p>
                                    <button
                                        onClick={toggleCart}
                                        className="text-[#00735C] font-bold hover:text-white transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item: { id: string; name: string; image: string; roastType: string; price: number; quantity: number }) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl"
                                    >
                                        <div className="relative w-20 h-20 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-serif text-white text-lg">{item.name}</h3>
                                            <p className="text-white/60 text-sm mb-2">{item.roastType}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="font-sans font-bold text-white">${item.price.toFixed(2)}</p>

                                                <div className="flex items-center space-x-3 bg-black/20 rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:text-[#00735C] transition-colors text-white"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-sans text-white w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:text-[#00735C] transition-colors text-white"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/20 space-y-4">
                                <div className="flex items-center justify-between text-white font-sans">
                                    <span className="opacity-60">Subtotal</span>
                                    <span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-center text-white/40">Shipping & taxes calculated at checkout.</p>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="block w-full py-4 bg-white text-[#002b22] text-center font-bold uppercase tracking-widest hover:bg-[#00735C] hover:text-white transition-colors rounded-xl"
                                >
                                    Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
