"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/app/lib/store";
import { createClient } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { StepShipping } from "@/app/components/checkout/StepShipping";
import { StepDelivery } from "@/app/components/checkout/StepDelivery";
import { StepPayment } from "@/app/components/checkout/StepPayment";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CheckoutPage() {
    const [step, setStep] = useState(1);
    const { items, clearCart } = useCartStore();
    const router = useRouter();
    const supabase = createClient();

    // Form Data State
    const [shippingData, setShippingData] = useState<Record<string, string>>({});
    const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = deliveryMethod === "express" ? 15 : 0;
    const total = subtotal + shippingCost;

    const handleCompleteOrder = async () => {
        // Here we would create the order in Supabase
        // For now, we simulate success

        // Example Supabase Insert (commented until auth context is fully ready in this component)
        /*
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from('orders').insert({
            user_id: user?.id,
            customer_email: shippingData.email,
            items: items,
            total_amount: total,
            shipping_address: shippingData
        });
        */

        clearCart();
        alert("Order Placed Successfully! Welcome to the family.");
        router.push("/");
    };

    if (items.length === 0 && step === 1) {
        return (
            <div className="min-h-screen bg-[#002b22] flex flex-col items-center justify-center text-white space-y-6">
                <h1 className="text-4xl font-serif">Your Cart is Empty</h1>
                <Link href="/" className="px-8 py-3 bg-[#00735C] rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-[#00735C] transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#002b22] pt-32 pb-12 px-4 md:px-0">
            <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Left Column: Steps */}
                <div>
                    {/* BREADCRUMBS */}
                    <div className="flex items-center space-x-2 text-sm text-white/40 mb-8 uppercase tracking-widest font-bold">
                        <span className={step === 1 ? "text-[#00735C]" : ""}>Shipping</span>
                        <ChevronRight size={14} />
                        <span className={step === 2 ? "text-[#00735C]" : ""}>Delivery</span>
                        <ChevronRight size={14} />
                        <span className={step === 3 ? "text-[#00735C]" : ""}>Payment</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <StepShipping
                                key="step1"
                                defaultValues={shippingData}
                                onNext={(data) => {
                                    setShippingData(data);
                                    setStep(2);
                                }}
                            />
                        )}
                        {step === 2 && (
                            <StepDelivery
                                key="step2"
                                selected={deliveryMethod}
                                onSelect={setDeliveryMethod}
                                onBack={() => setStep(1)}
                                onNext={() => setStep(3)}
                            />
                        )}
                        {step === 3 && (
                            <StepPayment
                                key="step3"
                                onBack={() => setStep(2)}
                                onComplete={handleCompleteOrder}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Column: Order Summary */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit sticky top-32">
                    <h3 className="text-xl font-serif text-white mb-6">Order Summary</h3>

                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-start text-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-white/10 w-12 h-12 rounded flex items-center justify-center text-xs text-white">
                                        <div className="relative w-8 h-8">
                                            {/* Simple fallback if image fails, though CartSidebar used Image component */}
                                            <img src={item.image} alt="product" className="object-contain w-full h-full" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{item.name}</p>
                                        <p className="text-white/60 text-xs">{item.roastType} x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="text-white font-mono">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-white/60">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                            <span>Shipping</span>
                            <span>{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                            <span>Taxes</span>
                            <span>$0.00</span>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                        <span className="text-xl font-serif text-white">Total</span>
                        <div className="text-right">
                            <span className="text-2xl font-bold text-[#00735C]">${total.toFixed(2)}</span>
                            <p className="text-xs text-white/40">USD</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
