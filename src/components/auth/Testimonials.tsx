
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
    <div className="relative hidden h-full flex-col lg:flex">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      
      <div className="relative z-20 h-full flex flex-col items-center justify-between p-10 text-white">
        <div className="flex items-center gap-2">
          <Icons.sparkles className="h-6 w-6" />
          <span className="text-lg font-bold">CV Master</span>
        </div>

        <div className="flex flex-col items-center justify-center max-w-xl mx-auto text-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "absolute transition-all duration-500 ease-in-out space-y-6",
                currentIndex === index
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
            >
              <div className="relative">
                <Icons.quote className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 text-white/20" />
                <blockquote className="space-y-4">
                  <p className="text-2xl font-light leading-relaxed tracking-wide">
                    {testimonial.text}
                  </p>
                  <footer className="space-y-2">
                    <p className="font-medium text-lg">{testimonial.author}</p>
                    <p className="text-white/80 text-sm">{testimonial.role}</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
          
          <div className="relative mt-8 flex gap-2">
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

        <div className="text-sm text-white/80 font-medium tracking-widest">
          SBA TECH GEEK
        </div>
      </div>
    </div>
  );
}
