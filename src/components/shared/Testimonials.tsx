"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  authorImage?: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function Testimonials({ 
  testimonials, 
  title = "Trusted by Safety Leaders", 
  subtitle = "See how Percepta is transforming industrial operations across the globe." 
}: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null; // Keep hidden until real data exists
  }

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{title}</h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#121214] border border-border/50 p-8 rounded-3xl flex flex-col justify-between"
            >
              <div className="mb-8">
                {/* SVG Quote Icon */}
                <svg className="w-8 h-8 text-primary/30 mb-6" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H10c0-1.1.9-2 2-2V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14H24c0-1.1.9-2 2-2V8z" />
                </svg>
                <p className="text-white/90 text-lg leading-relaxed font-medium">"{testimonial.quote}"</p>
              </div>

              <div className="flex items-center gap-4">
                {testimonial.authorImage ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border relative">
                    <Image src={testimonial.authorImage} alt={testimonial.authorName} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary/50 border border-border flex items-center justify-center">
                    <span className="text-white font-semibold">{testimonial.authorName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <h4 className="text-white font-bold text-sm">{testimonial.authorName}</h4>
                  <p className="text-muted-foreground text-xs">
                    {testimonial.authorRole}, {testimonial.authorCompany}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
