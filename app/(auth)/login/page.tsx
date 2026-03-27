"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"signin" | "signup">("signin");
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === "signup") {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                // Auto login or show check email message
                alert("Account created! Please check your email (if confirmation enabled) or sign in.");
                setMode("signin");
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push("/profile");
                router.refresh();
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#002b22] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-white mb-2">
                        {mode === "signin" ? "Welcome Back" : "Join the Family"}
                    </h1>
                    <p className="font-sans text-white/60 text-sm">
                        {mode === "signin" ? "Sign in to access your Homie Profile." : "Create an account to start earning rewards."}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00735C] transition-colors"
                            placeholder="homie@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-white uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00735C] transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#00735C] hover:bg-[#005c49] text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                        {loading ? "Processing..." : mode === "signin" ? "Sign In" : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                        className="text-white/40 hover:text-white text-sm transition-colors"
                    >
                        {mode === "signin" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => router.push('/')} className="text-white/20 hover:text-white text-xs uppercase tracking-widest">
                        Back to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
