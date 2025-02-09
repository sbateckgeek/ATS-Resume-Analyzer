
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  Globe
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full glass z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text">ResumeAI</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How it Works</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white glow">Get Started</Button>
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

      {/* CTA Section */}
      <section className="py-20 glass">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-8">
            Ready to Land Your Dream Job?
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg glow">
            Start Building Your Resume <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">ResumeAI</h3>
              <p className="text-sm text-muted-foreground">Building better careers with AI-powered tools</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
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
          <div className="border-t border-muted mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
