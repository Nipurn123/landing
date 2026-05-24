import TestimonialsSection from '../../sections/TestimonialsSection';
import type { Testimonial } from '../../sections/TestimonialsSection';

const codeTestimonials: Testimonial[] = [
  {
    id: 1,
    quote: "We evaluated multiple AI infrastructure providers before choosing 100xprompt. The decision was straightforward - high-performance foundation models, complete data sovereignty, and zero compromise on security. For any business handling sensitive data, this isn't optional. It's the only way forward.",
    author: "Sagar Nagda",
    role: "Co Founder, Nimap Infotech",
    badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face&q=80",
  }
];

export default function CodeFeatures() {
  return (
    <TestimonialsSection
      testimonials={codeTestimonials}
      title="What builders are saying"
      subtitle="Engineers shipping faster with 100x Code"
      accentColor="#22c55e"
      interval={6000}
      showArrows
      showQuoteIcon
      showStars
      variant="compact"
      className="mb-32"
    />
  );
}
