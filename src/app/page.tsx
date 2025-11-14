import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative">
          <HeroSection />
          <div className="relative z-20 bg-background">
            <ScrollAnimation>
              <AboutSection />
            </ScrollAnimation>
            <ScrollAnimation>
              <ServicesSection />
            </ScrollAnimation>
            <ScrollAnimation>
              <PortfolioSection />
            </ScrollAnimation>
            <ScrollAnimation>
              <TestimonialsSection />
            </ScrollAnimation>
            <ScrollAnimation>
              <ContactSection />
            </ScrollAnimation>
            {/* AI-Powered Visual Harmonization section removed */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
