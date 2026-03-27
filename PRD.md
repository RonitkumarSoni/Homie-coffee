# Product Requirements Document (PRD): HOMIE Coffee

## 1. Product Overview
**HOMIE Coffee** is a premium, immersive e-commerce web application designed to sell high-quality coffee products while delivering a unique digital experience. Unlike standard online stores, HOMIE Coffee focuses on "scrollytelling," using rich animations, video sequences, and interactive elements to emotionally connect with users before presenting products.

## 2. Target Audience
*   **Coffee Enthusiasts**: Individuals who care about bean origin, roasting process, and quality.
*   **Design-Savvy Consumers**: Users who appreciate modern, high-end web aesthetics and smooth user experiences.
*   **Gift Shoppers**: People looking for premium, well-packaged coffee products as gifts.

## 3. Core User Flows
1.  **Discovery**: User lands on the site -> Waits for assets to load (Preloader) -> Scrolls through the cinematic coffee animation -> Learns about the brand philosophy and origin.
2.  **Shopping**: User views products in the carousel or shop grid -> Adds items to cart -> Cart sidebar opens to confirm addition.
3.  **Checkout**: User proceeds to checkout -> Enters shipping info -> select delivery method -> enters payment details -> confirmation.
4.  **Membership**: User signs up/logs in to track orders and manage profile.

## 4. Key Features & Functional Requirements

### 4.1. Landing Page & Storytelling
*   **Preloader**:
    *   Must load a high-res image sequence (approx 140 frames) for the scroll animation.
    *   Visual progress indicator required.
*   **Hero Scroll Animation (`CoffeeScroll`)**:
    *   Frame-by-frame image scrubbing coupled with scroll position.
    *   Seamless transition from intro to content.
    *   Sticky positioning until sequence completes.
*   **Content Sections**:
    *   **Philosophy**: Text-based storytelling with typography emphasis.
    *   **Origin Story**: Visual grid/layout detailing the sourcing of beans.
    *   **Grain Overlay**: Persistent visual texture for "film" aesthetic.

### 4.2. E-Commerce Functionality
*   **Product Catalog**:
    *   **Carousel**: Horizontal scroll of featured items.
    *   **Grid**: Full listing of available products.
*   **Shopping Cart** (`useCartStore`):
    *   **Add to Cart**: Updates state, opens cart sidebar.
    *   **Cart Features**: Update quantity, remove item, subtotal calculation.
    *   **Persistence**: Cart contents saved to local storage via Zustand persist middleware.
*   **Checkout Process**:
    *   Multi-step form: Shipping -> Delivery -> Payment.
    *   State management for form data across steps.
    *   Summary of order visible throughout checkout.

### 4.3. Authentication
*   **Sign Up / Sign In**:
    *   Email and Password authentication via Supabase Auth.
    *   Toggle between "Join the Family" (Sign Up) and "Welcome Back" (Sign In) modes.
    *   Form validation and error handling (visual feedback).
    *   Redirection to `/profile` upon success.

### 4.4. Navigation & Layout
*   **Navbar**: Transparent/Glassmorphism style, sticky or fixed. Links to Shop, Story, Account, Cart.
*   **Smooth Scroll**: Integrated `lenis` for buttery smooth scroll behvaior, essential for the animation feel.

## 5. Technical Architecture

### 5.1. Tech Stack
*   **Framework**: Next.js 16 (App Router)
*   **Language**: TypeScript
*   **Styling**:
    *   Tailwind CSS v4 (Utility-first styling)
    *   PostCSS (Processing)
    *   Custom Design System (Colors like `#00735C` Deep Green, `#002b22` Darker Green)
*   **Animation**:
    *   `framer-motion` (UI transitions, entry animations)
    *   `lenis` (Smooth scrolling normalization)
*   **State Management**: `zustand` (Global client state for Cart)
*   **Backend & Database**:
    *   Supabase (PostgreSQL database, Auth, Storage for product images)
*   **Form Handling**: `react-hook-form` + `zod` (Validation schemas)

### 5.2. File Structure
*   `app/(auth)`: Route groups for authentication pages.
*   `app/(checkout)`: Route groups for isolated checkout layout.
*   `app/components`: Reusable UI components (Navbar, CartSidebar, etc.).
*   `app/lib`: Utilities, store definitions, Supabase client setup.

## 6. Design System & User Interface
*   **Color Palette**:
    *   Primary: Deep Green (`#00735C`)
    *   Background: Dark Forest (`#002b22`)
    *   Text: White / Off-white with variable opacity.
*   **Typography**:
    *   Serif for Headings (Elegant, Premium feel).
    *   Sans-serif for body text and UI elements (Legibility).
*   **Effects**:
    *   Glassmorphism (blur filters on overlays).
    *   Parallax effects on scroll.
    *   Micro-interactions (hover states, button clicks).

## 7. Future Roadmap (Post-MVP)
*   **User Dashboard**: Order history, saved addresses.
*   **Payment Integration**: connection to Stripe/PayPal via Supabase Edge Functions.
*   **Blog/Journal**: CMS integration for coffee brewing guides.
*   **Subscription**: "Subscribe & Save" functionality for recurring bean delivery.
