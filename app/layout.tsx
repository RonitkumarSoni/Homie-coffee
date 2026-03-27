import type { Metadata } from "next";
import { Inter, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "HOMIE Coffee | Pure Origin",
  description: "From cherry to cup. The journey of the perfect brew.",
};

import { Navbar } from "./components/Navbar";
import { GrainOverlay } from "./components/GrainOverlay";
import { SmoothScroll } from "./components/SmoothScroll";
import { CartSidebar } from "./components/cart/CartSidebar";
import { HydrationSuppressor } from "./components/HydrationSuppressor";

// ... (Metadata export remains same)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <HydrationSuppressor />
        <SmoothScroll>
          <GrainOverlay />
          <Navbar />
          <CartSidebar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
