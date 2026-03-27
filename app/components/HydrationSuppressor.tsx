"use client";

import { useEffect } from "react";

// Patch immediately on module load
if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args) => {
        if (typeof args[0] === "string" && (
            args[0].includes("hydration") ||
            args[0].includes("bis_skin_checked") ||
            args[0].includes("Minified React error #418") ||
            args[0].includes("Minified React error #423") ||
            args[0].includes("A tree hydrated but some attributes")
        )) {
            return;
        }
        originalError.apply(console, args);
    };
}

export function HydrationSuppressor() {
    return null;
}
