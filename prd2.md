 IMPROVED PRD — Vaidya: Ayurvedic Digital Experience Platform
Frontend Only | React 18 | Ultra-Premium UI/UX Edition v2.0

1. 🧭 PRODUCT VISION & PHILOSOPHY
Design Philosophy
"Where Ancient Wisdom Meets Digital Luxury"
Every pixel must feel like it was carved from sandalwood and dipped in saffron. The experience should feel alive — breathing, organic, and deeply intentional. Users must feel healed just by browsing.
Guiding Principles

Sensory-First Design: Every section triggers a sensory memory — smell of herbs, warmth of oil, texture of leaves
Motion as Medicine: Animations are not decoration — they guide, calm, and educate
Depth Over Flatness: Layered 3D, parallax, and shadow systems create physical presence
Trust Through Craft: Premium UI signals premium product quality


2. 🎨 DESIGN SYSTEM — EXPANDED
Color Palette (Expanded Semantic System)
TokenHexUsage--saffron-fire#C4622DPrimary CTA, highlights--turmeric-gold#E9A84CAccents, icons, hover states--forest-deep#1E3A1EDark backgrounds, footer--leaf-mid#3B5E3ASection backgrounds--parchment#F5ECD7Light backgrounds--cream-white#FAF6EECards, modals--copper-rust#A0522DBorders, dividers--midnight-herb#0D1F0DDark mode base--gold-shimmer#D4AF37Premium badges, stars
Typography System
Display (Hero headings):     Cormorant Garamond — 96px / 72px
Title (Section headings):    Cinzel — 48px / 36px
Subheading:                  DM Serif Display — 28px / 24px
Body:                        DM Sans — 16px / 14px
Caption/Label:               Jost — 12px / 11px
Sanskrit/Accent:             Tiro Devanagari Sanskrit — decorative use
Spacing & Grid

Base unit: 8px
Grid: 12-column, 1440px max-width, 80px gutter desktop
Sections: minimum 120px top/bottom padding
Cards: 24px inner padding, 16px border-radius

Shadow System
css--shadow-leaf:   0 4px 24px rgba(59, 94, 58, 0.15);
--shadow-earth:  0 8px 48px rgba(196, 98, 45, 0.12);
--shadow-deep:   0 24px 80px rgba(13, 31, 13, 0.25);
--shadow-glow:   0 0 40px rgba(233, 168, 76, 0.3);

3. 🏠 HOME PAGE — FULLY EXPANDED
Section 1 — Cinematic Hero (Full Viewport)
Layout: Full 100vh, dark forest background with grain texture overlay
3D Canvas Layer (React Three Fiber):

Floating 3D herb cluster: Tulsi, Neem, Ashwagandha as individual GLB models
Each herb slowly rotates and bobs with <Float> + spring physics
Ambient particle field: golden dust motes floating upward (Three.js Points)
Soft volumetric god-rays effect using post-processing <Bloom>
Mouse parallax: herbs shift depth as cursor moves (raycasting)

Text Layer (GSAP + SplitText):

Sanskrit verse fades in first in Tiro Devanabari font — top center
Main headline: "Heal. Restore. Thrive." — characters stagger in with spring
Subline reveals word-by-word beneath it
Two CTAs animate in last: Book Free Consultation (filled saffron) + Explore Remedies (ghost)

Ambient Sound Toggle (optional): soft nature sounds icon — chirping birds + flowing water
Scroll Cue: Animated SVG vine that grows downward, pulses gently

Section 2 — Live Wellness Stats Bar
Thin full-width strip between hero and next section:
🌿 12,000+ Consultations    |    ⭐ 4.9 Rating    |    🧴 350+ Products    |    👨‍⚕️ 48 Expert Vaidyas

Numbers count up with countUp.js on scroll entry
Smooth marquee loop on mobile
Dividers: small SVG lotus icons


Section 3 — Dosha Identity Finder (Interactive)
Full-width immersive section with dark forest green background
Concept: Three glowing orbs representing Vata / Pitta / Kapha hover in 3D space
Interaction:

Hover on each orb: expands, reveals Sanskrit symbol + English name + traits
Below orbs: "Which one are you?" with animated text shimmer
CTA: Discover Your Dosha → leads to quiz page
Background: animated mandala slowly rotates behind orbs at 10% opacity

3D Implementation: React Three Fiber <mesh> spheres with custom GLSL shader — organic surface distortion that responds to mouse proximity

Section 4 — Disease / Concern Search Hub
Large centered search bar with real-time filter suggestions
[ 🔍  What are you healing today?  Skin · Diabetes · Stress · Hair... ]

Auto-suggest dropdown with herb icon + condition name + "X consultations"
Below search: Category Pill Grid — 16 conditions in animated pill buttons

Skin, Digestion, Stress, Diabetes, PCOS, Hair, Joints, Weight, Sleep, Thyroid, Immunity, Liver, Heart, Eyes, Respiratory, Women's Health


On hover: pill glows, background shifts to herb-relevant color
On click: navigates to filtered consultation/product page
Background: subtle animated SVG botanical pattern (leaves breathing)


Section 5 — Featured Doctors Carousel (Trust Builder)
Headline: "Your Healing Begins With Them" in Cinzel
Card Design (premium doctor card):

Circular portrait with animated botanical border (SVG rotating ring)
Name, specialization, years experience, language spoken
Star rating with animated fill
"Available Today" badge (pulsing green dot)
Hover: card lifts + reveals 2-line bio + Book Now button slides up from bottom
Background of card: subtle gradient with corresponding dosha color

Carousel: Framer Motion drag carousel, 3 visible on desktop, 1 on mobile, auto-scroll with pause on hover

Section 6 — Healing Journey Timeline
Horizontal pinned scroll (GSAP ScrollTrigger pin + scrub)
5 steps scroll left-to-right:

Share Your Concern — icon: speech bubble with leaf
Meet Your Vaidya — icon: doctor silhouette in mandala
Personal Diagnosis — icon: pulse line + herb
Custom Remedy Plan — icon: prescription scroll
Track & Transform — icon: lotus blooming animation

Each step: large number, title, 2-line description, animated SVG illustration
Connecting line: a vine that grows as you scroll through each step

Section 7 — Product Showcase (3D Tilt Gallery)
Headline: "Nature's Pharmacy, Curated" with animated underline draw
Layout: Staggered asymmetric grid — 1 large card + 2 medium + 3 small
Card Features:

Product image with CSS perspective 3D tilt on mouse move
Ingredient tags float up on hover
Quick-add to cart with satisfying spring pop animation
"Bestseller" / "New" / "Doctor Recommended" ribbon badges
Price with original + discounted, animated strikethrough

Background: Slow-moving warm gradient mesh animation

Section 8 — Ingredient Encyclopedia (Interactive Herb Wall)
Concept: Botanical illustration wall — a grid of 12 Ayurvedic herbs
Each herb tile:

Painted botanical illustration style (high-res PNG/WebP)
Hover: tile flips (CSS 3D flip) to reveal:

Sanskrit name + English name
Primary benefit (1 line)
Dosha it balances
Explore → link



Animated background: very slow parallax of overlapping leaf layers

Section 9 — Testimonial Cinema
Full-width dark section — cinematic feel

Large quotation mark (3D extruded, Three.js) looms in background at 5% opacity
Testimonial text renders in DM Serif Display — large, breathable
User avatar, name, condition treated, city
Navigation: Previous / Next with swipe gesture support
Auto-advance every 6 seconds with progress bar indicator (thin saffron line)
Star animation: stars fill one-by-one on entry


Section 10 — Educational Video Strip
Concept: "Learn the Ancient Way" — 4 embedded video cards

Autoplay muted loop thumbnails on hover
Play icon: custom SVG lotus that opens on hover
Topics: What is Ayurveda? / 3 Doshas Explained / Morning Rituals / Panchakarma
Each card: gradient overlay, title, duration badge, category tag


Section 11 — Trust & Certifications Bar
Full-width light section with trust signals:

Ministry of AYUSH certified
ISO certified
15+ years of practice
100% natural ingredients
Partner logos with grayscale → color hover


Section 12 — Blog Teaser (Editorial Layout)
Layout: 1 featured post (large, left) + 3 smaller cards (right column)
Featured post card:

Full bleed image with gradient overlay
Category badge, title in display font, excerpt, read time
Hover: subtle image zoom + title underline animates

Small cards:

Horizontal layout (image left, text right)
Tag, title, date
Hover: left border stripe animates from 0 to full height


Section 13 — Subscription CTA Band
Dark full-width banner with gold gradient text:
"Start Your 30-Day Healing Journey — ₹299/month"
Personalized plan · Monthly herb kit · Weekly check-in

Animated herb kit illustration (Lottie or CSS keyframes) floats beside text
CTA button with shimmer sweep animation


Section 14 — Newsletter & Community
Split layout:

Left: "Join 50,000 Healers" — with community avatars stacked in a circle
Right: Email input with animated label, submit with petal-burst confetti


4. 🩺 CONSULTATION PAGE — EXPANDED
Appointment Booking Flow (Multi-Step Wizard)
Step 1 — Concern Selection

Animated category grid (same as homepage but full-page)
Multi-select with satisfying toggle animations
Progress vine grows at top as steps complete

Step 2 — Symptom Questionnaire

Card-based questions, one at a time
Framer Motion slide transition between questions
Symptom severity slider: organic CSS slider with herb icon thumb
Duration picker: custom wheel scroll component

Step 3 — Doctor Matching

Loading state: spinning Ayurvedic chakra animation with "Finding your Vaidya…"
3 matched doctors displayed with compatibility score + specialty match tags
Filter: Language, Availability, Gender, Specialization

Step 4 — Slot Booking

Interactive calendar: custom-built, no library dependency
Time slot grid with animated availability states (green pulse = open)
Timezone auto-detect banner

Step 5 — Confirm & Pay

Order summary card
Payment mode selection with animated icons
Booking confirmation: full-screen celebration animation (lotus blooms)


5. 🛒 PRODUCTS PAGE — EXPANDED
Catalog Page
Hero Strip: Rotating banner with seasonal collection highlights
Filter System (Left sidebar on desktop, bottom drawer on mobile):

Dosha type toggle: Vata / Pitta / Kapha pills
Health concern multi-select tree
Form: Oil / Powder / Tablet / Tea / Syrup
Price range: dual-handle organic-styled slider
Ratings filter
"Doctor Recommended" toggle switch

Product Grid:

Masonry layout with Framer Motion stagger reveal
Each card: image, name, key ingredient tags, rating, price, quick-add
Hover state: secondary image crossfade (like e-commerce best practice)
Wishlist heart with spring bounce animation

Active Filters Bar: shows applied filters as removable pills, "Clear All" link

Product Detail Page
Section 1 — Product Hero

Left: 3D model viewer (React Three Fiber) OR image gallery with zoom
Image gallery: thumbnail strip below main, click to swap with crossfade
Zoom: magnifier lens on hover
Right: Product name, rating, price, size variants, quantity selector, Add to Cart + Buy Now

Section 2 — The Story of This Herb

Horizontal scroll narrative (GSAP pin)
Origin story → Traditional use → Scientific backing → Your benefit
Background changes color as narrative progresses

Section 3 — Ingredient Breakdown

Animated radial chart showing ingredient percentages
Each ingredient: click to expand detailed benefit card
3D molecule-style connecting nodes (Three.js Line + Sphere nodes)

Section 4 — How to Use

Step-by-step with illustrated icons
Morning / Evening / Dosage timeline visual

Section 5 — Reviews

Filter reviews by rating, condition, verified purchase
Top review highlighted in a "Community Favourite" card
Review form: star selector + text + condition tags

Section 6 — Frequently Bought Together

Bundle suggestion with combined price + savings badge
One-click add all to cart


6. 🧘 DOSHA QUIZ PAGE — EXPANDED
Quiz Experience
Intro Screen:

Full dark screen, floating 3D Tridosha symbol
Animated Sanskrit text dissolves in
"Begin Your Self-Discovery" CTA with ripple

Question Flow (20 questions):

Categories: Physical traits → Digestion → Sleep → Emotions → Lifestyle
Question types: Single select cards / Sliders / Image-select (pick a body type illustration)
Each answer card: hover glow, selected state with checkmark morph animation

Results Screen:

Dosha percentage breakdown: animated arc/donut chart
Primary dosha 3D symbol rotates in center
Personalized profile: strengths, imbalance signs, seasonal advice
Product recommendations: 4 cards slide in from bottom
Diet guide: downloadable PDF (CSS print-styled component)
Share card: stylized result card, shareable image


7. 👨‍⚕️ DOCTORS PAGE — EXPANDED
Listing Page

Filter bar: specialization, availability, language, rating, gender
Sort: Top Rated / Most Experienced / Earliest Available
Each doctor card: photo, name, degree, specialization tags, languages, rating, price/session, availability status, Book Now

Doctor Profile Page

Hero: large portrait, credentials ribbon, stats (consultations, experience, languages)
About section with animated read more
Specializations: visual tag cloud with hover expand
Patient reviews: filterable, verified badges
Availability calendar: full interactive weekly view
Similar doctors: horizontal scroll strip


8. 📊 USER DASHBOARD — EXPANDED
Dashboard Layout

Sidebar navigation (desktop) / Bottom nav (mobile)
Welcome header with personalized dosha greeting

Dashboard Cards

Next Consultation: countdown timer, join button
Active Prescriptions: herb kit status, days remaining
Order Tracking: visual step tracker
Health Score: circular gauge (based on quiz + consultation data)
Streak: daily wellness practice streak with flame animation

Sections

Consultation History: table with filters, download prescription
My Prescriptions: PDF viewer inline
Order History: with re-order functionality
Saved Products: wishlist management
Health Journal: text entry with mood selector + herb tag
Notifications: bell with animated badge, list view


9. 📚 BLOG / KNOWLEDGE HUB — EXPANDED
Blog Home

Hero: featured article full-width with parallax
Categories tab bar: All / Herbs / Diet / Lifestyle / Disease / Research
Trending strip: horizontal scroll of 6 trending articles
Main grid: masonry 3-column with varied card sizes

Article Detail Page

Reading progress bar (thin line at top, fills on scroll)
Pull-quote blocks styled as Sanskrit scrolls
Inline herb cards: mention "Ashwagandha" → hoverable popup with quick facts
Author bio card with other articles
Related articles: 3-card strip at bottom
Estimated read time + category + share buttons (sticky left sidebar on desktop)
Table of contents: floating right sidebar, highlights active section


10. 📞 CONTACT PAGE — EXPANDED

Split hero: Left = 3D mortar and pestle animation, Right = contact options
Contact options: Book Consultation / Product Query / Partnership / Feedback — each as a styled card
Form: animated fields, character counter on message, subject auto-tag
Interactive map: custom styled (earthy tones), custom botanical pin marker
FAQ accordion below: smooth height animation, icon rotates on open
WhatsApp floating button: bottom-right, custom botanical icon, bounce on load


11. 🧩 GLOBAL COMPONENTS — EXPANDED
ComponentDescription<IntroLoader>Mandala SVG draws itself stroke-by-stroke, then iris-wipes open to reveal page<CustomCursor>Golden ring cursor + trailing leaf particles, changes shape on hover over CTAs<Navbar>Glass-morphism on scroll, mega-menu with herb category image grid, animated active indicator<MegaMenu>Full-width dropdown: condition icons + doctor featured card + product highlight<PageTransition>Botanical curtain wipe: saffron panel sweeps across, then reveals new page<ScrollProgress>Thin golden vine that grows from left to right as page scrolls<FloatingCart>Persistent cart icon with item count badge, spring bounce on add<CartDrawer>Right-side drawer: item list, subtotal, suggested add-ons, checkout CTA<ToastNotification>Botanical-styled toast: leaf icon + message + auto-dismiss with progress bar<DoshaOrb>Reusable 3D dosha orb, configurable color and shader<HerbCard>Flip card component used across site<AnimatedCounter>Count-up number with suffix (K, +, %) on scroll entry<SectionReveal>Wrapper component — children stagger-reveal on viewport entry<ParallaxLayer>Wraps any element to apply depth-based parallax on scroll<MandalaWatermark>SVG mandala background layer, rotates slowly, configurable opacity<VideoModal>Full-screen video modal with botanical frame border, close with ESC<SubscriptionBanner>Dismissable top banner with animated text carousel<BackToTop>Floating button appears after 50% scroll, smooth scroll to top, lotus icon<DarkModeToggle>Sun/Moon toggle with satisfying morphing animation

12. 🎬 ANIMATION MASTER PLAN
Entry Animations
Page load:       Intro loader → curtain wipe → hero fade + stagger
Section entry:   GSAP ScrollTrigger fromTo (y:60 → y:0, opacity:0 → 1)
Card entry:      Stagger delay 0.1s per card, spring type
Image entry:     Clip-path reveal (rectangle opens from center)
Scroll-Based Animations
Hero parallax:          Background moves at 0.5x scroll speed
Text parallax:          Heading moves at 1.2x (faster than scroll)
Horizontal journey:     GSAP pin + scrub, 5 steps
Ingredient story:       Color background morph on scroll progress
Vine growth:            SVG path length animates with scrollYProgress
Hover Animations
Product cards:    perspective tilt + shadow deepen + scale 1.02
Doctor cards:     lift + bio reveal slide-up
Buttons:          shimmer sweep + scale 1.05 + shadow grow
Nav links:        underline draws from left
Herb tiles:       3D flip (preserve-3d)
CTA primary:      background gradient animates position
3D Animations
Hero scene:       Floating herbs with <Float> spring, mouse parallax
Dosha orbs:       GLSL shader surface distortion, proximity response
Ingredient nodes: Orbiting spheres connected with <Line>
Globe:            Auto-rotate, pin hover expand, country highlight
Product viewer:   Drag to rotate, pinch to zoom (touch support)
Quote mark:       Extruded 3D text, very slow rotation

13. 📱 RESPONSIVE STRATEGY
BreakpointStrategy<480px Mobile SSingle column, no 3D (image fallback), bottom nav, touch carousels480–768px Mobile LSingle column, simplified animations, swipeable sections768–1024px Tablet2-column grids, reduced parallax, touch 3D (low poly)1024–1280px LaptopFull animations, sidebar layouts appear>1280px DesktopFull 3D, all effects, maximum density

14. ⚡ PERFORMANCE ARCHITECTURE
Code splitting:     React.lazy per page + Suspense with botanical loader
3D models:          GLB < 500KB each, Draco compressed, LOD switching
Images:             WebP + AVIF, responsive srcSet, lazy loading
Fonts:              Preload top 2 fonts, font-display: swap
GSAP:               Dynamic import, disabled if prefers-reduced-motion
Three.js:           WebGL check + graceful image fallback
CSS:                Critical CSS inlined, rest async loaded

15. ♿ ACCESSIBILITY REQUIREMENTS

All animated elements respect prefers-reduced-motion
Color contrast ratio ≥ 4.5:1 for all text
All interactive elements keyboard navigable
ARIA labels on all icon-only buttons
Focus indicators: custom gold ring outline
Alt text on all images including decorative (role="presentation")
Screen reader skip-to-content link


16. 🌙 DARK MODE SYSTEM
Full dark mode with distinct dark tokens:
css[data-theme="dark"] {
  --bg-primary:    #0D1F0D;   /* midnight herb */
  --bg-secondary:  #1A2E1A;
  --bg-card:       #162016;
  --text-primary:  #F5ECD7;   /* parchment */
  --text-muted:    #A8956B;
  --accent:        #E9A84C;   /* turmeric stays */
  --border:        #2A402A;
}

All 3D scenes have dark environment map
Background particles shift to cooler gold tones
Images get subtle warm filter overlay in dark mode


17. 📁 FINAL FOLDER STRUCTURE
src/
├── assets/
│   ├── fonts/
│   ├── images/          # WebP/AVIF optimized
│   ├── models/          # .glb Draco compressed
│   ├── lottie/          # .json animation files
│   ├── textures/        # grain, parchment, wood
│   └── svg/             # botanical illustrations, mandalas
│
├── components/
│   ├── ui/              # Button, Badge, Input, Card, Modal, Toast
│   ├── layout/          # Navbar, Footer, Sidebar, MegaMenu
│   ├── global/          # Cursor, Loader, Transition, ScrollProgress
│   ├── 3d/              # HeroScene, GlobeScene, DoshaOrbs, ProductViewer
│   ├── sections/        # All page section components
│   ├── quiz/            # QuizCard, QuizProgress, QuizResult, DoshaChart
│   ├── consultation/    # BookingWizard, DoctorCard, SlotPicker
│   ├── shop/            # ProductCard, FilterDrawer, CartDrawer, ReviewCard
│   └── blog/            # ArticleCard, TableOfContents, HerbPopup
│
├── pages/               # Home, About, Products, ProductDetail, Consultation,
│                        # DoctorList, DoctorProfile, Quiz, Blog, BlogDetail,
│                        # Dashboard, Contact
│
├── hooks/
│   ├── useScrollAnimation.js
│   ├── useLenis.js
│   ├── useThreeScene.js
│   ├── useDarkMode.js
│   ├── useCountUp.js
│   └── useParallax.js
│
├── context/
│   ├── CartContext.jsx
│   ├── QuizContext.jsx
│   ├── ThemeContext.jsx
│   └── ConsultationContext.jsx
│
├── data/
│   ├── herbs.js
│   ├── doctors.js
│   ├── products.js
│   ├── doshaQuiz.js
│   └── blogPosts.js
│
├── styles/
│   ├── globals.css
│   ├── tokens.css        # CSS custom properties
│   ├── animations.css
│   └── typography.css
│
└── utils/
    ├── cn.js
    ├── formatPrice.js
    ├── doshaLogic.js
    └── webglCheck.js

✅ IMPLEMENTATION PRIORITY ORDER
PhasePages / FeaturesPhase 1Design System + Global components + Home PagePhase 2Products Catalog + Product Detail + CartPhase 3Consultation Booking Wizard + DoctorsPhase 4Dosha Quiz + Blog + Blog DetailPhase 5User Dashboard + Contact + AboutPhase 6Dark Mode + Accessibility + Performance Pass