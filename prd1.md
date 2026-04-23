 PRD — Ayurvedic Website (Frontend Only)
Product Name: Vaidya — The Ancient Wellness Experience

1. PROJECT OVERVIEW
FieldDetailProduct TypeFrontend-only Marketing & E-commerce UITech StackReact 18, Vite, Tailwind CSS, Framer Motion, Three.js / React Three Fiber, GSAP, Lenis (smooth scroll), React Router v6Target AudienceHealth-conscious urban users, Ayurveda seekers, wellness enthusiastsDesign LanguageLuxury Organic — earthy tones, ancient manuscript textures, fluid motionTheme ColorsDeep Saffron #C4622D, Forest Leaf #3B5E3A, Turmeric Gold #E9A84C, Cream Parchment #F5ECD7, Charcoal #1C1C1CFontsDisplay: Cormorant Garamond (regal serif), Body: DM Sans, Accent: Cinzel

2. TECH STACK — DETAILED
LayerLibrary/ToolPurposeFrameworkReact 18 + ViteFast SPARoutingReact Router v6Multi-page navigationStylingTailwind CSS + CSS ModulesUtility + custom stylesAnimationFramer MotionPage transitions, scroll reveals3DReact Three Fiber + Drei3D plant/herb models, particle sceneGSAPGSAP + ScrollTriggerAdvanced scroll-based animationsSmooth ScrollLenisButtery page scrolling3D TextThree.js TextGeometryFloating 3D section headingsIconsLucide ReactClean SVG iconsFontsGoogle Fonts (Cormorant + DM Sans + Cinzel)TypographyStateReact Context + useStateUI state, cart, filters

3. SITE ARCHITECTURE — PAGES
/                    → Home Page
/about               → About / Our Story
/products            → Products Catalog
/products/:id        → Product Detail
/treatments          → Ayurvedic Treatments
/dosha-quiz          → Dosha Quiz (Vata/Pitta/Kapha)
/blog                → Blog / Articles
/blog/:slug          → Blog Detail
/contact             → Contact Page

4. PAGE-BY-PAGE BREAKDOWN

🏠 PAGE 1 — HOME PAGE /
4.1 Hero Section

Full-screen 3D canvas using React Three Fiber
Floating 3D herb/leaf particles orbiting slowly (Drei <Float> + custom geometry)
Cinematic text reveal: "Heal from the Root" — letter-by-letter GSAP animation
Parallax scroll on background texture (parchment grain)
CTA buttons: Explore Remedies + Take Dosha Quiz with ripple hover effect
Scroll indicator: animated snake/vine that moves downward

4.2 Scroll-Triggered Section — "The Three Pillars"

Pinned horizontal scroll (GSAP ScrollTrigger pin + scrub)
3 cards for Vata / Pitta / Kapha with illustrated icons (SVG animated on scroll)
Each card background shifts color as it enters viewport
Soft ambient blur halos behind each card

4.3 Featured Products Strip

Horizontal auto-scroll carousel (Framer Motion drag + velocity)
Each product card: 3D tilt on hover (CSS perspective + rotateX/Y)
Ingredient tag badges, price, and "Add to Cart" slide-up reveal
Leaf-particle trail on mouse move across this section

4.4 "Ancient Wisdom" Quote Block

Full-width Sanskrit quote in Cinzel font
Animated underline that draws itself (SVG stroke-dashoffset animation)
Background: slow Ken Burns pan on a high-res Ayurvedic painting texture

4.5 Ingredient Spotlight — Interactive Globe

React Three Fiber globe showing origin points of herbs (Ashwagandha → India, etc.)
Hover on a pin: tooltip rises with herb name, benefit, and image
Globe slowly auto-rotates, stops on hover

4.6 Testimonials Section

Staggered card stack with Framer Motion layout animations
Scroll through testimonials with a vine/line connecting them vertically
Avatar images with soft circular botanical border SVGs

4.7 Newsletter Sign-up

Immersive full-width section with parallax botanical illustration
Framer Motion form field focus animations
Submit triggers a petal-burst particle effect (custom Canvas or Three.js)


📖 PAGE 2 — ABOUT /about

Timeline scroll experience: GSAP horizontal pinned timeline of Ayurveda's history (5000 BCE → Present)
Each era: illustrated card with texture overlay, date counter animation
"Meet the Founders" — 3D card flip on hover (CSS transform-style: preserve-3d)
Values grid with SVG icon morph animations on scroll
Full-screen video section (looping nature B-roll) with text overlay parallax


🛍️ PAGE 3 — PRODUCTS /products

3-column masonry grid with stagger-in animation on load
Filter bar: Dosha type, Category, Price — animated pill-toggle filters
Each card: hover lifts with shadow depth + ingredient preview tooltip
"Sort by" with smooth reorder animation (Framer Motion layout prop)
Infinite scroll with load-more animation (spinning Ayurvedic mandala loader)
Side drawer filter panel: slides in from left with blur backdrop


🔬 PAGE 4 — PRODUCT DETAIL /products/:id

Hero split-screen: Left = rotating 3D product model (React Three Fiber), Right = product info
Ingredient breakdown: animated circular diagram (D3 or SVG arcs)
Dosage guide: expandable accordion with smooth height animation
"You May Also Like": drag carousel at bottom
Sticky "Add to Cart" bar appears on scroll past CTA
Reviews: star rating with animated fill


💆 PAGE 5 — TREATMENTS /treatments

Full-page sections for each treatment: Panchakarma, Abhyanga, Shirodhara, etc.
Parallax depth layers — 3 layers of botanical elements move at different speeds
Each treatment: autoplay ambient video background (muted) + text overlay
Booking CTA with calendar picker (styled custom, no libraries)
Animated benefit icons: SVG path drawing on scroll


🧘 PAGE 6 — DOSHA QUIZ /dosha-quiz

Multi-step animated quiz — Framer Motion page transitions between questions
Progress bar: organic vine that grows as you answer
Question cards slide in with spring physics
Results page:

3D animated dosha symbol (custom Three.js geometry)
Personalized product recommendations
Shareable result card (CSS screenshot-able card component)




📰 PAGE 7 — BLOG /blog

Editorial magazine layout: featured post = full-width hero card
Below: 2-column + 1-column mixed grid (CSS Grid)
Tag filter with animated underline indicator
Hover on article: image zoom + title color shift
Reading time badge + category pill


📞 PAGE 8 — CONTACT /contact

Split layout: Left = 3D animated mortar & pestle (Three.js), Right = form
Form fields with organic label float animation
Custom map embed with botanical map pin marker
WhatsApp + Email CTAs with subtle bounce animation


5. GLOBAL COMPONENTS
ComponentDescriptionNavbarTransparent → solid on scroll, mega-menu with herb category images, mobile hamburger with full-screen overlay menuFooterDark earthy tone, 4-column links, animated newsletter input, social icons with hover scaleCursorCustom cursor: golden circle + trailing leaf particle on movementPageTransitionFull-screen curtain wipe between routes (Framer Motion AnimatePresence)LoaderFull-screen intro loader: Ayurvedic mandala draws itself in SVG, then fadesScrollProgressThin saffron line at top of viewportToastNotificationBotanical-styled toast (add to cart, form submit)CartDrawerSide drawer sliding in from right, product list with quantity controlsMandalaBackgroundSubtle rotating SVG mandala watermark on select pages

6. ANIMATION SYSTEM
Animation TypeToolUsagePage enter/exitFramer Motion AnimatePresenceAll page transitionsScroll revealsGSAP ScrollTriggerSections, text, cards3D scenesReact Three Fiber + DreiHero, product, globeHover micro-interactionsCSS + Framer MotionButtons, cards, linksSmooth scrollingLenisEntire siteSVG path drawCSS stroke-dashoffsetIcons, dividers, quote underlinesSpring physicsFramer Motion spring typeQuiz cards, modalsParticle effectsThree.js PointsHero, newsletter, quiz result

7. RESPONSIVE DESIGN
BreakpointLayoutMobile (<768px)Single column, simplified animations, no 3D (fallback image)Tablet (768–1024px)2-column grids, reduced 3D complexityDesktop (>1024px)Full experience with all 3D and animations

All 3D scenes degrade gracefully — if WebGL is unavailable, a high-res image fallback is shown.


8. PERFORMANCE GUIDELINES

Code splitting: each page is lazy-loaded with React.lazy + Suspense
3D assets: GLB models compressed with gltf-pipeline (< 1MB each)
Images: WebP format, lazy loading with loading="lazy"
GSAP: only loaded on desktop, disabled on prefers-reduced-motion
Fonts: preloaded in <head>, subset to used characters


9. FOLDER STRUCTURE
src/
├── assets/           # Images, textures, 3D models (.glb)
├── components/
│   ├── ui/           # Button, Card, Badge, Input, Toast
│   ├── layout/       # Navbar, Footer, PageTransition
│   ├── 3d/           # HeroCanvas, GlobeScene, ProductViewer
│   ├── sections/     # HomeHero, ProductStrip, Testimonials...
│   └── quiz/         # QuizCard, QuizProgress, QuizResult
├── pages/            # Home, About, Products, ProductDetail...
├── hooks/            # useScrollAnimation, useThreeScene, useLenis
├── context/          # CartContext, QuizContext
├── styles/           # globals.css, animations.css
├── utils/            # cn(), formatPrice(), doshaData.js
└── App.jsx

10. DELIVERABLES CHECKLIST

 All 8 pages built and routed
 3D hero scene (React Three Fiber)
 Herb origin globe (Three.js)
 Product 3D viewer
 Dosha quiz with animated results
 GSAP horizontal scroll timeline (About)
 Custom cursor with leaf trail
 Page transition curtain wipe
 Mandala SVG intro loader
 Full responsive layout
 Cart drawer component
 Performance optimizations applied