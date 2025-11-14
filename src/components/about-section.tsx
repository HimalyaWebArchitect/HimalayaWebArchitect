import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, PenTool, TrendingUp, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';



const values = [
    { icon: Lightbulb, title: "Innovation", description: "We push the boundaries of technology to create novel solutions." },
    { icon: PenTool, title: "Craftsmanship", description: "Pixel-perfect design and elegant code are at our core." },
    { icon: BrainCircuit, title: "Strategy", description: "Data-driven insights guide our every decision for optimal results." },
    { icon: TrendingUp, title: "Growth", description: "We are dedicated to scaling your business in the digital landscape." },
]

export function AboutSection() {
  return (
    <section id="about" className="bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-primary border-primary/50 mb-4 text-sm">Our Philosophy</Badge>
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">
            Where Creativity Meets Code
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a collective of designers, developers, and strategists passionate about building the next generation of web experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {values.map((value, index) => (
                <div key={index} className="text-center p-6 border border-border rounded-lg bg-background/50 hover:bg-background transition-all duration-300 hover:shadow-primary/10 hover:shadow-lg transform hover:-translate-y-2">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
                        <value.icon className="w-8 h-8 text-primary"/>
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-muted-foreground mt-2">{value.description}</p>
                </div>
            ))}
        </div>

        {/* Architects section removed */}
      </div>
    </section>
  );
}
