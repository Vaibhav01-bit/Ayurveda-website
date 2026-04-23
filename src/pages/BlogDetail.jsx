import { useParams, Link } from 'react-router-dom';
import Badge from '../components/ui/Badge';

export default function BlogDetail() {
  const { slug } = useParams();

  return (
    <div className="pt-24 pb-24 px-4 max-w-3xl mx-auto">
      <Link to="/blog" className="text-saffron hover:text-turmeric transition-colors mb-8 inline-block font-accent text-sm tracking-wider">
        ← Back to Journal
      </Link>
      
      <div className="mb-8">
        <Badge className="mb-4">Dosha Guide</Badge>
        <h1 className="font-display text-4xl md:text-6xl text-forest mb-4 capitalize">{slug.replace(/-/g, ' ')}</h1>
        <p className="text-charcoal/50">Published on April 22, 2026 • 5 min read</p>
      </div>

      <img 
        src="https://images.unsplash.com/photo-1498843053639-170ff2122f35?w=1200&auto=format&fit=crop" 
        alt="Article Hero" 
        className="w-full h-96 object-cover rounded-2xl mb-12 shadow-md"
      />

      <div className="prose prose-lg prose-headings:font-display prose-headings:text-forest text-charcoal/80">
        <p>
          Ayurveda, the ancient Indian system of medicine, categorizes the human body and its energetic forces into three primary doshas: Vata, Pitta, and Kapha. Understanding these doshas is the first step toward achieving lasting balance and wellness.
        </p>
        <h2>The Characteristics of Vata</h2>
        <p>
          Vata is composed of Space and Air. It is the energy of movement, governing everything from the blinking of your eyes to the beating of your heart. When in balance, Vata promotes creativity and flexibility. When out of balance, it can lead to anxiety, dryness, and irregular digestion.
        </p>
        <blockquote>
          "Balance is not something you find, it's something you create."
        </blockquote>
        <p>
          To pacify aggravated Vata, it's essential to establish a warming, grounding routine. Heavy root vegetables, warm oils, and structured daily habits are the key to bringing this airy dosha back to earth.
        </p>
      </div>
    </div>
  );
}
