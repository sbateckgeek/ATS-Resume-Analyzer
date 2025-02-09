
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import {
  CheckCircle2,
  FileText,
  Linkedin,
  MessageSquare,
  Search,
  Github,
  ArrowRight,
  Star,
  Users,
  Database,
  Globe,
  Zap,
  Mail,
  PenTool,
  Clock,
  Sparkles,
  BadgeCheck
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full glass z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="text-2xl font-bold gradient-text">CV Master</div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <ThemeToggle />
              <Button variant="outline" className="hover:bg-primary/10">
                Log in
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary mb-8">
            <Star className="w-4 h-4" /> AI-Powered Resume Builder
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up gradient-text">
            Create ATS-Optimized
            <br />
            Resumes with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-up max-w-2xl mx-auto">
            Build professional resumes that pass Applicant Tracking Systems and help you land your dream job faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg glow">
              Start Building <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "AI Support" },
              { number: "50+", label: "Templates" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold gradient-text">
                Transform Your Career with AI-Powered Resume Building
              </h2>
              <p className="text-lg text-muted-foreground">
                CV Master leverages cutting-edge AI technology to help you create resumes that not only look professional but are optimized for modern Applicant Tracking Systems (ATS).
              </p>
              <div className="space-y-4">
                {[
                  "Smart keyword optimization for higher ATS scores",
                  "Real-time feedback and suggestions",
                  "Professional templates designed by experts",
                  "Instant LinkedIn profile import"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <BadgeCheck className="text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6">Learn More <ArrowRight className="ml-2" /></Button>
            </div>
            <div className="glass p-8 rounded-2xl animate-float">
              <div className="aspect-video bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional, ATS-optimized resumes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Database className="w-8 h-8 text-primary" />,
                title: "ATS Optimization",
                description: "Ensure your resume passes automated screening systems",
              },
              {
                icon: <Search className="w-8 h-8 text-primary" />,
                title: "Keyword Analysis",
                description: "Match your skills with job requirements automatically",
              },
              {
                icon: <Linkedin className="w-8 h-8 text-primary" />,
                title: "LinkedIn Integration",
                description: "Import your professional profile with one click",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-primary" />,
                title: "AI Cover Letters",
                description: "Generate tailored cover letters instantly",
              },
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Expert Review",
                description: "Get feedback from HR professionals",
              },
              {
                icon: <Globe className="w-8 h-8 text-primary" />,
                title: "Multi-language",
                description: "Create resumes in multiple languages",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-6 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-4 bg-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              How CV Master Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create your perfect resume in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <PenTool className="w-8 h-8 text-primary" />,
                step: "1",
                title: "Choose Your Template",
                description: "Select from our collection of ATS-optimized templates",
              },
              {
                icon: <FileText className="w-8 h-8 text-primary" />,
                step: "2",
                title: "Fill Your Details",
                description: "Import from LinkedIn or enter your information manually",
              },
              {
                icon: <Zap className="w-8 h-8 text-primary" />,
                step: "3",
                title: "AI Optimization",
                description: "Let our AI enhance your resume for maximum impact",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="glass p-8 rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-primary/20 text-primary font-bold">
                  {step.step}
                </div>
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "Free",
                features: [
                  "1 ATS-Optimized Resume",
                  "Basic Templates",
                  "Export to PDF",
                  "Email Support"
                ]
              },
              {
                name: "Pro",
                price: "$12/mo",
                popular: true,
                features: [
                  "Unlimited Resumes",
                  "Premium Templates",
                  "LinkedIn Integration",
                  "AI Cover Letter Generator",
                  "Priority Support"
                ]
              },
              {
                name: "Enterprise",
                price: "$29/mo",
                features: [
                  "All Pro Features",
                  "Custom Branding",
                  "Team Management",
                  "API Access",
                  "Dedicated Support"
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`glass p-8 rounded-xl relative ${
                  plan.popular ? "scale-105 border-2 border-primary" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6 gradient-text">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? "bg-primary" : "bg-muted"}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 bg-muted/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful job seekers who landed their dream jobs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                company: "Google",
                testimonial: "CV Master helped me optimize my resume and land my dream job at Google. The AI suggestions were incredibly helpful!"
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                company: "Amazon",
                testimonial: "The ATS optimization feature is a game-changer. I got more callbacks in one week than I did in months of job searching."
              },
              {
                name: "Emily Brooks",
                role: "Marketing Director",
                company: "Netflix",
                testimonial: "The LinkedIn integration saved me hours of work, and the AI-powered suggestions helped me highlight my achievements perfectly."
              }
            ].map((testimonial, index) => (
              <div key={index} className="glass p-8 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about CV Master
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How does CV Master optimize for ATS?",
                answer: "Our AI analyzes job descriptions and optimizes your resume's content and formatting to ensure maximum compatibility with Applicant Tracking Systems."
              },
              {
                question: "Can I import my LinkedIn profile?",
                answer: "Yes! CV Master seamlessly imports your LinkedIn profile data and formats it professionally in your chosen template."
              },
              {
                question: "How many resume versions can I create?",
                answer: "Free users can create one resume, while Pro and Enterprise users can create unlimited versions tailored to different job applications."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. We use industry-standard encryption and security measures to protect your personal information."
              }
            ].map((faq, index) => (
              <div key={index} className="glass p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-2">{faq.question}</h4>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced design */}
      <section className="py-32 glass relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-8">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of successful professionals who have accelerated their careers with CV Master
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg glow">
              Start Building Your Resume <ArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg border-primary/20 hover:bg-primary/10">
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Footer with Newsletter */}
      <footer className="border-t border-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
                <div className="text-2xl font-bold gradient-text">CV Master</div>
              </div>
              <p className="text-sm text-muted-foreground">Building better careers with AI-powered tools</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4">Subscribe to Our Newsletter</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates and career tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <Button className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-muted pt-8 text-center text-sm text-muted-foreground">
            <div className="flex justify-between items-center">
              <p>&copy; 2024 CV Master. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
