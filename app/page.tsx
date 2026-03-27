"use client";

import { useState } from "react";
import CoffeeScroll from "./components/CoffeeScroll";
import { Preloader } from "./components/Preloader";
import { AnimatePresence } from "framer-motion";
import { Philosophy } from "./components/Philosophy";
import { OriginStory } from "./components/OriginStory";
import { ProductCarousel } from "./components/ProductCarousel";
import { ShopGrid } from "./components/ShopGrid";


// Generate the list of image URLs staticly
const FRAME_COUNT = 142;
const imageList = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const paddedIndex = (i + 1).toString().padStart(3, "0");
  return `/sequence/ezgif-frame-${paddedIndex}.jpg`;
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="min-h-screen bg-[#00735C]">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            images={imageList}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <CoffeeScroll />
      <Philosophy />
      <OriginStory />
      <ProductCarousel />
      <ShopGrid />

      {/* Footer / Contact Section */}
      <section className="relative z-10 py-24 sm:py-32 overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/images/community_bg.png" 
            alt="Café community" 
            className="object-cover w-full h-full opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002b22] via-[#002b22]/90 to-[#002b22]/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white/90">
          <h2 className="font-display text-shadow text-white mb-6 sm:mb-8" style={{ fontSize: 'var(--text-h2)' }}>
            Join the Family.
          </h2>
          <div className="flex justify-center space-x-6 sm:space-x-10 mb-10 sm:mb-12">
            <a href="#" className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:text-white text-white/70 transition-colors">Instagram</a>
            <a href="#" className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:text-white text-white/70 transition-colors">Twitter</a>
            <a href="#" className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase hover:text-white text-white/70 transition-colors">Email</a>
          </div>
          <p className="font-serif italic text-white/50 mb-6 sm:mb-8" style={{ fontSize: 'var(--text-h4)' }}>
            &quot;Life is too short for bad coffee.&quot;
          </p>
          <div className="w-16 h-[1px] bg-white/20 mx-auto mb-6 sm:mb-8" />
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase opacity-40">
            © 2026 HOMIE Coffee Co.
          </p>
        </div>
      </section>
    </main>
  );
}
