
import { useState, useEffect } from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    text: "CV Master has helped me optimize my resume and land interviews at top tech companies. The AI-powered suggestions are game-changing!",
    author: "Sofia Davis",
    role: "Software Engineer at Google"
  },
  {
    text: "This tool transformed my job search. I went from zero callbacks to multiple interviews within weeks of optimizing my resume.",
    author: "Michael Chen",
    role: "Product Manager at Microsoft"
  },
  {
    text: "The AI analysis helped me understand exactly what was missing from my resume. Now I'm confident my applications stand out.",
    author: "Emma Thompson",
    role: "Marketing Director at Adobe"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary animate-gradient-x" />
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative z-20 flex items-center gap-2">
        <Icons.sparkles className="h-6 w-6" />
        <span className="text-lg font-bold">CV Master</span>
      </div>
      <div className="relative z-20 mt-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={cn(
              "absolute transition-all duration-500 ease-in-out space-y-4",
              currentIndex === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[-100%]"
            )}
          >
            <div className="relative">
              <Icons.quote className="absolute -top-8 -left-4 h-16 w-16 text-white/20" />
              <blockquote className="space-y-2">
                <p className="text-xl leading-relaxed">{testimonial.text}</p>
                <footer className="text-sm">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-white/80">{testimonial.role}</p>
                </footer>
              </blockquote>
            </div>
          </div>
        ))}
        <div className="relative z-20 mt-6 flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                currentIndex === index ? "bg-white w-6" : "bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
