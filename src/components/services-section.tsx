import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, LineChart, Hammer, ShoppingCart } from 'lucide-react';

const services = [
  {
    icon: PenTool,
    title: 'Web Design',
    description: 'We create visually stunning and intuitive user interfaces that captivate your audience and tell your brand’s story.',
  },
  {
    icon: LineChart,
    title: 'SEO',
    description: 'Our data-driven SEO strategies increase your visibility, drive organic traffic, and boost your search engine rankings.',
  },
  {
    icon: Hammer,
    title: 'Website Development',
    description: 'We build fast, interactive websites that blend cutting-edge tech with conversion-focused design.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'We build robust and scalable e-commerce solutions that provide a seamless shopping experience and drive sales.',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">Our Services</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            From concept to launch, we provide a full suite of services to bring your digital vision to life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
              <CardHeader className="items-center text-center">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                  <service.icon className="w-10 h-10 text-primary transition-all duration-300 group-hover:scale-125" />
                  <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:animate-glow" />
                </div>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
