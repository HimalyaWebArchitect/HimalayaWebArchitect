"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// Removed tooltip import

const portfolioItems = PlaceHolderImages.filter(img => img.id.startsWith('portfolio-'));

export function PortfolioSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="portfolio" className="bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">Our Work</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We transform complex problems into beautiful, intuitive digital solutions. Explore our latest projects.
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-4">
            <div />
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={scrollPrev} className="p-2 rounded-md bg-background/60 hover:bg-background">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button aria-label="Next" onClick={scrollNext} className="p-2 rounded-md bg-background/60 hover:bg-background">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {portfolioItems.map((item, index) => (
                <div key={item.id} className="flex-shrink-0 w-72 md:w-96 p-2">
                  <Card className="overflow-hidden group/item border-border/50">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.description}
                          fill
                          data-ai-hint={item.imageHint}
                          className="object-cover transition-transform duration-500 group-hover/item:scale-110 cursor-pointer"
                        />
                        {/* Centered Demo URL button overlay, visible on hover */}
                        {item.demoUrl && (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 z-20"
                            style={{ pointerEvents: 'auto' }}
                          >
                            <span className="bg-black/70 text-white px-4 py-2 rounded shadow-lg text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors duration-200 cursor-pointer">
                              View Demo
                            </span>
                          </a>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 transition-opacity duration-500 opacity-0 group-hover/item:opacity-100 z-10" style={{ pointerEvents: 'none' }}>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2 transform-gpu transition-transform duration-500 group-hover/item:translate-y-0 translate-y-4">{item.name}</h3>
                            <p className="text-gray-300 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100 delay-200">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {portfolioItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                className={`w-3 h-3 rounded-full ${selectedIndex === idx ? 'bg-accent' : 'bg-border'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
