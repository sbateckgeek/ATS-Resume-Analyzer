
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import MobileMenu from "@/components/MobileMenu";
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
  BadgeCheck,
  ChevronRight,
  Download,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-purple-gradient">
      {/* Navigation */}
      <nav className="fixed w-full z-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <div className="text-2xl font-bold text-white">CV Master</div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-white/70 hover:text-white transition-colors">Pricing</a>
              <a href="#blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
              <a href="#about" className="text-white/70 hover:text-white transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                  <a href="/auth/login">Talk to an expert</a>
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-white" asChild>
                  <a href="/auth/signup">Download the app</a>
                </Button>
              </div>
              <div className="block md:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                Modern analytics<br />for the modern world
              </h1>
              <p className="text-lg text-white/70 max-w-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Suspendisse varius enim et eros elementum tristique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-background hover:bg-white/90 px-8 text-sm font-medium"
                >
                  <Download className="mr-2 h-4 w-4" /> Download the app
                </Button>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 text-sm font-medium"
                >
                  Talk to an expert
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="dashboard-container animate-float">
                <img 
                  src="/placeholder.svg" 
                  alt="Dashboard Preview" 
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured By Section */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/50 mb-8">Trusted by teams at over 1000+ of the world's leading organizations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { name: "Dell", logo: "Dell" },
              { name: "Zendesk", logo: "Zendesk" },
              { name: "Reddit", logo: "Reddit" },
              { name: "Pacific Funds", logo: "Pacific" },
              { name: "NCS", logo: "NCS" },
              { name: "Lattice", logo: "Lattice" },
              { name: "TED", logo: "TED" },
            ].map((company, index) => (
              <div key={index} className="opacity-50 hover:opacity-100 transition-opacity">
                <span className="text-white text-lg font-medium">{company.logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Features that work<br />for your future.
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Check out our amazing features and experience the power of CV Master for yourself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-primary" />
                </div>,
                title: "Digital Credit Tool",
                description: "Protect your sensitive card details and security codes when transacting online for banking and eCommerce needs."
              },
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>,
                title: "Keyword Analysis",
                description: "Match your skills with job requirements automatically with our advanced algorithms."
              },
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>,
                title: "LinkedIn Integration",
                description: "Import your professional profile with one click and keep everything synchronized."
              },
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>,
                title: "AI Cover Letters",
                description: "Generate tailored cover letters instantly with our advanced AI technology."
              },
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>,
                title: "Expert Review",
                description: "Get feedback from HR professionals on your resume before submitting to employers."
              },
              {
                icon: <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>,
                title: "Multi-language Support",
                description: "Create resumes in multiple languages to apply for jobs internationally."
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="glass accent-border p-6 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  <a href="#" className="flex items-center">
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section className="py-32 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="dashboard-container">
                <img 
                  src="/placeholder.svg" 
                  alt="Analytics Dashboard" 
                  className="w-full rounded-xl"
                />
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Our powerful analytics<br />provides invaluable insights
              </h2>
              <p className="text-lg text-white/70">
                Power of data with our cutting-edge analytics product. Get instant access to 
                our real-time Analytics Dashboard, which takes advantage of the latest in 
                digital signal processing to provide your customers and operations teams with 
                valuable intelligence.
              </p>
              <div>
                <Button 
                  size="lg"
                  className="bg-white text-background hover:bg-white/90"
                >
                  <Download className="mr-2 h-4 w-4" /> Download the app
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
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
                  plan.popular ? "border border-primary/50" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6 text-primary">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-white/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.popular ? "bg-primary" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 glass">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who have accelerated their careers with CV Master
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-background hover:bg-white/90 px-8"
            >
              <Download className="mr-2 h-4 w-4" /> Download the app
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 px-8"
            >
              Talk to an expert
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <div className="text-xl font-bold text-white">CV Master</div>
              </div>
              <p className="text-sm text-white/50">Building better careers with AI-powered tools</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-white/50">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-white/50">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-semibold mb-4 text-white">Subscribe</h4>
              <p className="text-sm text-white/50 mb-4">
                Get the latest updates and career tips delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-lg border border-white/20 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <Button className="shrink-0 bg-primary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <div className="flex justify-between items-center">
              <p>&copy; 2024 CV Master. All rights reserved.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/50 hover:text-white">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/50 hover:text-white">
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
