import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { QuizProvider } from './context/QuizContext';
import CartDrawer from './components/ui/CartDrawer';
import CustomCursor from './components/layout/CustomCursor';
import PageTransition from './components/layout/PageTransition';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Treatments = lazy(() => import('./pages/Treatments'));
const DoshaQuiz = lazy(() => import('./pages/DoshaQuiz'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Consultation = lazy(() => import('./pages/Consultation'));
const Doctors = lazy(() => import('./pages/Doctors'));
const DoctorDetail = lazy(() => import('./pages/DoctorDetail'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-turmeric-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <QuizProvider>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <CustomCursor />
          <div className="flex flex-col min-h-screen bg-parchment text-charcoal font-body relative">
            <Navbar />
            <CartDrawer />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <PageTransition>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/consultation" element={<Consultation />} />
                    <Route path="/doctors" element={<Doctors />} />
                    <Route path="/doctors/:id" element={<DoctorDetail />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/treatments" element={<Treatments />} />
                    <Route path="/dosha-quiz" element={<DoshaQuiz />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </PageTransition>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </QuizProvider>
    </CartProvider>
  );
}

export default App;
