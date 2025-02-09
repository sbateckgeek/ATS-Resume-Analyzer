
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText, Linkedin, MessageSquare, Search } from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-primary">ResumeAI</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary transition-colors">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-white">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <span className="inline-block animate-fade-down px-3 py-1 text-sm font-semibold text-secondary bg-secondary/10 rounded-full mb-4">
            AI-Powered Resume Builder
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-up">
            Land Your Dream Job with
            <span className="text-secondary"> ATS-Optimized </span>
            Resumes
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-up max-w-2xl mx-auto">
            Create professional resumes that pass Applicant Tracking Systems and catch recruiters' attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg">
              Build Your Resume
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to create a winning resume
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-8 h-8 text-secondary" />,
                title: "ATS Optimization",
                description: "Ensure your resume passes automated screening systems",
              },
              {
                icon: <Search className="w-8 h-8 text-secondary" />,
                title: "Keyword Analysis",
                description: "Match your skills with job requirements automatically",
              },
              {
                icon: <Linkedin className="w-8 h-8 text-secondary" />,
                title: "LinkedIn Integration",
                description: "Import your professional profile with one click",
              },
              {
                icon: <MessageSquare className="w-8 h-8 text-secondary" />,
                title: "AI Cover Letters",
                description: "Generate tailored cover letters instantly",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Three Simple Steps to Success
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Resume",
                description: "Start with your existing resume or create one from scratch",
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI analyzes and optimizes your resume for ATS compatibility",
              },
              {
                step: "3",
                title: "Get Hired",
                description: "Apply with confidence using your optimized resume",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Land Your Dream Job?
          </h2>
          <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg">
            Start Building Your Resume
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">ResumeAI</h3>
              <p className="text-sm">Building better careers with AI-powered tools</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
