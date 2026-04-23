import HomeHero from '../components/sections/HomeHero';
import SmartDiseaseSearch from '../components/sections/SmartDiseaseSearch';
import ConsultationSteps from '../components/sections/ConsultationSteps';
import FeaturedDoctorsSection from '../components/sections/FeaturedDoctorsSection';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import Testimonials from '../components/sections/Testimonials';
import TrustSection from '../components/sections/TrustSection';
import BlogPreview from '../components/sections/BlogPreview';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <SmartDiseaseSearch />
      <ConsultationSteps />
      <FeaturedDoctorsSection />
      <FeaturedProducts />
      <Testimonials />
      <TrustSection />
      <BlogPreview />
    </div>
  );
}
