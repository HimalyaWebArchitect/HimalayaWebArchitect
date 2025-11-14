"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "Himalaya Web Architects transformed our online presence. Their attention to detail and creative vision is unparalleled. The new 3D model is simply breathtaking!",
    name: 'Eva Chen',
    // company: 'CEO, Stellar Solutions',
    avatar: 'EC',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
  },
  {
    quote: "The team is professional, responsive, and incredibly talented. They delivered a product that exceeded all our expectations. Highly recommended!",
    name: 'Marcus Wright',
    // company: 'Founder, QuantumLeap Inc.',
    avatar: 'MW',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026708d',
  },
  {
    quote: "Working with the architects was a seamless experience. They understood our brand and translated it into a beautiful and functional website.",
    name: 'Sophia Loren',
    // company: 'Marketing Director, GeoData',
    avatar: 'SL',
    image: 'https://i.pravatar.cc/150?u=a042581f4e29026709d',
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We are proud to have partnered with amazing clients from around the globe.
          </p>
        </div>
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="h-full bg-card/50 border-border/50 relative pt-12 animate-float" style={{ animationDelay: `-${index * 1.2}s` }}>
                    <CardContent className="text-center">
                      <p className="italic text-muted-foreground before:content-['“'] before:mr-1 after:content-['”'] after:ml-1">
                        {testimonial.quote}
                      </p>
                      <div className="mt-6 flex flex-col items-center">
                        <Avatar className="w-16 h-16 border-2 border-accent mb-2">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                        </Avatar>
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-accent">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
