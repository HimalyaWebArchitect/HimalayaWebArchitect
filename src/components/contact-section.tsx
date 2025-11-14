"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Map dialing code to 2-letter ISO codes (fallback to dialing code if missing)

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .optional()
    .refine((v) => !v || v.trim().length >= 7, {
      message: "Phone must be at least 7 characters.",
    }),
  phoneCountry: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phoneCountry: '+977', phone: '', message: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

      if (!serviceId || !templateId || !userId) {
        throw new Error('EmailJS not configured in the browser');
      }

      const combinedMessage = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phoneCountry ? values.phoneCountry + ' ' : ''}${values.phone}\nMessage:\n${values.message}\n`;

      const templateParams = {
        to_name: values.name,
        to_email: values.email,
        phone: `${values.phoneCountry ? values.phoneCountry + ' ' : ''}${values.phone ?? ''}`,
        message: combinedMessage,
        from_name: values.name,
        from_email: values.email,
        time: new Date().toLocaleString(),
      };

      try {
        if (userId && typeof emailjs.init === 'function') {
          emailjs.init(userId);
        }
      } catch (initErr) {
        console.error('EmailJS init error:', initErr);
      }

      console.log('EmailJS send params:', { serviceId, templateId, templateParams, userId });

      try {
        const result = await emailjs.send(serviceId, templateId, templateParams, userId);
        console.log('EmailJS send result:', result);

        const success =
          (result && typeof result === 'object' && (result as any).status >= 200 && (result as any).status < 300) ||
          (typeof result === 'string' && result === 'OK') ||
          (result && ((result as any).text === 'OK' || (result as any).status === 200));

        if (success) {
          toast({ title: 'Message sent', description: 'We received your message and will reply shortly.' });
          form.reset();
          setIsSending(false);
          return;
        }
        console.warn('EmailJS send did not indicate success, falling back to server route', result);
      } catch (emailErr) {
        console.error('EmailJS send error:', emailErr);
      }
    } catch (err) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (res.ok && data?.success) {
          toast({ title: 'Message sent', description: 'We received your message and will reply shortly.' });
          form.reset();
          setIsSending(false);
          return;
        }
      } catch (_) {
      }

      toast({ title: 'Send failed', description: (err as any)?.message || 'Something went wrong. Try again later.', variant: 'destructive' });
    } finally {
      setIsSending(false);
    }
  };



  return (
    <section id="contact" className="bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold font-headline tracking-tight">Let's Build Together</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? We'd love to hear about it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="bg-accent/10 p-3 rounded-full"><MapPin className="text-accent w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Our Offices</h3>
                <h2 className="font-bold text-md">Nepal</h2>
                <p className="text-muted-foreground">kathmandu, Nepal</p>
                <div className="pt-2">
                  <h2 className="font-bold text-md">India</h2>
                  <p className="text-muted-foreground">Bangalore, Karnataka, India</p>
                </div>
              </div>

            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="bg-accent/10 p-3 rounded-full"><Mail className="text-accent w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-muted-foreground">himalayawebarchitect@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg">
              <div className="bg-accent/10 p-3 rounded-full"><Phone className="text-accent w-6 h-6" /></div>
              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-muted-foreground">(NP)+9779866154796</p>
                <p className="text-muted-foreground">(IN)+91-9113887210</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-8 bg-background/50 border-border/50">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Alex Nova" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone No</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <select
                                {...form.register('phoneCountry')}
                                className="h-10 rounded-l-md bg-background border-border/20 px-2 text-sm"
                                aria-label="Country code"
                                title="Select country (full name on hover)" style={{ width: '9rem' }}>
                                <option value="+93">Afghanistan (+93)</option>
                                <option value="+355">Albania (+355)</option>
                                <option value="+213">Algeria (+213)</option>
                                <option value="+376">Andorra (+376)</option>
                                <option value="+244">Angola (+244)</option>
                                <option value="+54">Argentina (+54)</option>
                                <option value="+374">Armenia (+374)</option>
                                <option value="+61">Australia (+61)</option>
                                <option value="+43">Austria (+43)</option>
                                <option value="+994">Azerbaijan (+994)</option>
                                <option value="+1">United States (+1)</option>
                                <option value="+973">Bahrain (+973)</option>
                                <option value="+880">Bangladesh (+880)</option>
                                <option value="+32">Belgium (+32)</option>
                                <option value="+975">Bhutan (+975)</option>
                                <option value="+591">Bolivia (+591)</option>
                                <option value="+387">Bosnia and Herzegovina (+387)</option>
                                <option value="+55">Brazil (+55)</option>
                                <option value="+359">Bulgaria (+359)</option>
                                <option value="+375">Belarus (+375)</option>
                                <option value="+506">Costa Rica (+506)</option>
                                <option value="+56">Chile (+56)</option>
                                <option value="+86">China (+86)</option>
                                <option value="+57">Colombia (+57)</option>
                                <option value="+237">Cameroon (+237)</option>
                                <option value="+1">Canada (+1)</option>
                                <option value="+53">Cuba (+53)</option>
                                <option value="+357">Cyprus (+357)</option>
                                <option value="+420">Czech Republic (+420)</option>
                                <option value="+45">Denmark (+45)</option>
                                <option value="+49">Germany (+49)</option>
                                <option value="+20">Egypt (+20)</option>
                                <option value="+372">Estonia (+372)</option>
                                <option value="+34">Spain (+34)</option>
                                <option value="+358">Finland (+358)</option>
                                <option value="+33">France (+33)</option>
                                <option value="+995">Georgia (+995)</option>
                                <option value="+44">United Kingdom (+44)</option>
                                <option value="+30">Greece (+30)</option>
                                <option value="+36">Hungary (+36)</option>
                                <option value="+385">Croatia (+385)</option>
                                <option value="+354">Iceland (+354)</option>
                                <option value="+91">India (+91)</option>
                                <option value="+62">Indonesia (+62)</option>
                                <option value="+98">Iran (+98)</option>
                                <option value="+964">Iraq (+964)</option>
                                <option value="+353">Ireland (+353)</option>
                                <option value="+972">Israel (+972)</option>
                                <option value="+39">Italy (+39)</option>
                                <option value="+81">Japan (+81)</option>
                                <option value="+962">Jordan (+962)</option>
                                <option value="+254">Kenya (+254)</option>
                                <option value="+7">Kazakhstan (+7)</option>
                                <option value="+82">South Korea (+82)</option>
                                <option value="+965">Kuwait (+965)</option>
                                <option value="+856">Laos (+856)</option>
                                <option value="+961">Lebanon (+961)</option>
                                <option value="+423">Liechtenstein (+423)</option>
                                <option value="+370">Lithuania (+370)</option>
                                <option value="+352">Luxembourg (+352)</option>
                                <option value="+371">Latvia (+371)</option>
                                <option value="+218">Libya (+218)</option>
                                <option value="+389">North Macedonia (+389)</option>
                                <option value="+60">Malaysia (+60)</option>
                                <option value="+356">Malta (+356)</option>
                                <option value="+52">Mexico (+52)</option>
                                <option value="+373">Moldova (+373)</option>
                                <option value="+377">Monaco (+377)</option>
                                <option value="+976">Mongolia (+976)</option>
                                <option value="+212">Morocco (+212)</option>
                                <option value="+95">Myanmar (+95)</option>
                                <option value="+31">Netherlands (+31)</option>
                                <option value="+977">Nepal (+977)</option>
                                <option value="+234">Nigeria (+234)</option>
                                <option value="+47">Norway (+47)</option>
                                <option value="+64">New Zealand (+64)</option>
                                <option value="+968">Oman (+968)</option>
                                <option value="+507">Panama (+507)</option>
                                <option value="+92">Pakistan (+92)</option>
                                <option value="+51">Peru (+51)</option>
                                <option value="+63">Philippines (+63)</option>
                                <option value="+48">Poland (+48)</option>
                                <option value="+351">Portugal (+351)</option>
                                <option value="+974">Qatar (+974)</option>
                                <option value="+40">Romania (+40)</option>
                                <option value="+7">Russia (+7)</option>
                                <option value="+381">Serbia (+381)</option>
                                <option value="+966">Saudi Arabia (+966)</option>
                                <option value="+65">Singapore (+65)</option>
                                <option value="+421">Slovakia (+421)</option>
                                <option value="+386">Slovenia (+386)</option>
                                <option value="+27">South Africa (+27)</option>
                                <option value="+94">Sri Lanka (+94)</option>
                                <option value="+46">Sweden (+46)</option>
                                <option value="+41">Switzerland (+41)</option>
                                <option value="+886">Taiwan (+886)</option>
                                <option value="+66">Thailand (+66)</option>
                                <option value="+90">Turkey (+90)</option>
                                <option value="+380">Ukraine (+380)</option>
                                <option value="+971">United Arab Emirates (+971)</option>
                                <option value="+598">Uruguay (+598)</option>
                                <option value="+998">Uzbekistan (+998)</option>
                                <option value="+58">Venezuela (+58)</option>
                                <option value="+84">Vietnam (+84)</option>
                                <option value="+967">Yemen (+967)</option>
                              </select>
                              <Input
                                placeholder="123 456 7890"
                                {...field}
                                className="rounded-l-none rounded-r-md"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us about your project..." {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 group transition-transform transform hover:scale-105">
                      Send Message
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
