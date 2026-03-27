"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User } from "@supabase/supabase-js";

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

interface Order {
    id: string;
    created_at: string;
    status: string;
    items: OrderItem[];
    total_amount: number;
}

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                const { data: ordersData } = await supabase
                    .from("orders")
                    .select("*")
                    .eq("user_id", user.id)
                    .order("created_at", { ascending: false });
                setOrders(ordersData || []);
            }
            setLoadingOrders(false);
        };
        getUser();
    }, [supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#002b22] pt-32 px-4 pb-12">
            <div className="container mx-auto max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="md:col-span-1 bg-[#00735C] rounded-3xl p-8 shadow-2xl relative overflow-hidden h-fit"
                    >
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10 text-center space-y-6">
                            <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-3xl font-serif text-[#00735C]">
                                {user.email?.[0].toUpperCase()}
                            </div>

                            <div>
                                <h1 className="text-2xl font-serif text-white mb-2">Welcome Home.</h1>
                                <p className="text-white/60 font-sans text-sm break-all">{user.email}</p>
                            </div>

                            <div className="py-6 border-t border-white/10 border-b">
                                <h2 className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">Member Discount</h2>
                                <div className="bg-black/20 rounded-xl p-3 flex items-center justify-center space-x-2 cursor-pointer hover:bg-black/30 transition-colors group">
                                    <span className="text-xl font-mono text-white font-bold tracking-widest">HOMIE20</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSignOut}
                                className="w-full py-3 rounded-full bg-black/20 text-white hover:bg-red-500/20 hover:text-red-200 transition-colors font-sans text-xs font-bold uppercase tracking-wide"
                            >
                                Sign Out
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column: Order History */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="md:col-span-2 space-y-6"
                    >
                        <h2 className="text-2xl font-serif text-white">Order History</h2>

                        {loadingOrders ? (
                            <div className="bg-white/5 rounded-2xl p-8 text-center text-white/40 animate-pulse">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white/5 rounded-2xl p-12 text-center border border-white/5">
                                <p className="text-white/60 mb-6">You haven&apos;t placed any orders yet.</p>
                                <button onClick={() => router.push('/')} className="px-6 py-3 bg-[#00735C] rounded-full text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#00735C] transition-colors">
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-white font-bold text-lg mb-1">Order #{order.id.slice(0, 8)}</p>
                                                <p className="text-white/40 text-xs uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-[#00735C]/20 text-[#00735C] rounded-full text-xs font-bold uppercase tracking-wide border border-[#00735C]/20">
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            {order.items.map((item, idx: number) => (
                                                <div key={idx} className="flex justify-between text-sm text-white/80">
                                                    <span>{item.quantity}x {item.name}</span>
                                                    <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                            <span className="text-white/40 text-xs uppercase tracking-widest">Total Amount</span>
                                            <span className="text-xl font-bold text-white font-mono">${order.total_amount}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
