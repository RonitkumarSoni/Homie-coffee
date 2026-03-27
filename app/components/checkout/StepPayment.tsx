"use client";

import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/app/lib/store";
import { useRouter } from "next/navigation";

export function StepPayment({
    onBack,
    onComplete
}: {
    onBack: () => void,
    onComplete: () => Promise<void>
}) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { items } = useCartStore();
    const router = useRouter();

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        await onComplete();
        setIsProcessing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-serif text-white mb-6">Payment Details</h2>

            <form onSubmit={handlePay} className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-white/60 text-sm font-bold uppercase tracking-widest">Card Info</span>
                        <div className="flex space-x-2">
                            <div className="w-8 h-5 bg-white/10 rounded" />
                            <div className="w-8 h-5 bg-white/10 rounded" />
                        </div>
                    </div>

                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                        <input
                            required
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className="w-full bg-black/20 border border-white/10 rounded-lg pl-12 pr-4 py-3 text-white font-mono placeholder-white/20 focus:border-[#00735C] outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            required
                            type="text"
                            placeholder="MM / YY"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono placeholder-white/20 focus:border-[#00735C] outline-none"
                        />
                        <input
                            required
                            type="text"
                            placeholder="CVC"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono placeholder-white/20 focus:border-[#00735C] outline-none"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center space-x-2 text-white/40 text-xs">
                    <Lock size={12} />
                    <span>Payments are secure and encrypted.</span>
                </div>

                <div className="pt-6 flex space-x-4">
                    <button
                        type="button"
                        onClick={onBack}
                        disabled={isProcessing}
                        className="w-1/3 py-4 text-white/60 hover:text-white font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={items.length === 0 || isProcessing}
                        className="w-2/3 bg-white text-[#002b22] hover:bg-gray-100 font-bold py-4 rounded-xl uppercase tracking-widest transition-colors disabled:opacity-50 flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-5 h-5 border-2 border-[#002b22] border-t-transparent rounded-full"
                            />
                        ) : (
                            "Pay Now"
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
