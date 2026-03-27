"use client";

import { motion } from "framer-motion";
import { Truck, Rocket } from "lucide-react";

type DeliveryMethod = "standard" | "express";

export function StepDelivery({
    selected,
    onSelect,
    onNext,
    onBack
}: {
    selected: DeliveryMethod,
    onSelect: (m: DeliveryMethod) => void,
    onNext: () => void,
    onBack: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <h2 className="text-2xl font-serif text-white mb-6">Delivery Method</h2>

            <div className="space-y-4">
                <div
                    onClick={() => onSelect("standard")}
                    className={`p-6 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${selected === "standard"
                            ? "bg-[#00735C]/20 border-[#00735C]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                >
                    <div className="flex items-center space-x-4">
                        <Truck className={selected === "standard" ? "text-[#00735C]" : "text-white/40"} />
                        <div>
                            <h3 className="text-white font-bold">Standard Shipping</h3>
                            <p className="text-white/60 text-sm">3-5 Business Days</p>
                        </div>
                    </div>
                    <span className="text-white font-bold">Free</span>
                </div>

                <div
                    onClick={() => onSelect("express")}
                    className={`p-6 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${selected === "express"
                            ? "bg-[#00735C]/20 border-[#00735C]"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                >
                    <div className="flex items-center space-x-4">
                        <Rocket className={selected === "express" ? "text-[#00735C]" : "text-white/40"} />
                        <div>
                            <h3 className="text-white font-bold">Express Shipping</h3>
                            <p className="text-white/60 text-sm">1-2 Business Days</p>
                        </div>
                    </div>
                    <span className="text-white font-bold">$15.00</span>
                </div>
            </div>

            <div className="pt-6 flex space-x-4">
                <button
                    onClick={onBack}
                    className="w-1/3 py-4 text-white/60 hover:text-white font-bold uppercase tracking-widest transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="w-2/3 bg-[#00735C] hover:bg-[#005c49] text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-colors"
                >
                    Continue to Payment
                </button>
            </div>
        </motion.div>
    )
}
