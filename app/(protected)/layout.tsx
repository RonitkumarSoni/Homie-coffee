"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";
import { Preloader } from "@/app/components/Preloader"; // Reusing preloader UI style or simple loading

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.replace("/login");
            } else {
                setLoading(false);
            }
        };
        checkUser();
    }, [router, supabase]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#002b22] flex items-center justify-center text-white">
                <p className="font-serif italic animate-pulse">Verifying Membership...</p>
            </div>
        );
    }

    return <>{children}</>;
}
