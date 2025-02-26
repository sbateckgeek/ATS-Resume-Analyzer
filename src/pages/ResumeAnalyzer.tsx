
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Upload, Loader2, FileUp, Clipboard, Edit3, PenLine } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or image file (JPEG, PNG, WEBP)');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsAnalyzing(true);
      const { data, error } = await supabase.functions.invoke('upload-resume', {
        body: formData
      });

      if (error) throw error;
      if (!data?.text) throw new Error('Failed to extract text from file');

      setResumeText(data.text);
      await analyzeResume(data.text);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to process file. Please try pasting the text directly.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeResume = async (text?: string) => {
    const textToAnalyze = text || resumeText;
    if (!textToAnalyze.trim()) {
      toast.error("Please enter your resume text or upload a PDF");
      return;
    }

    if (!jobTitle.trim()) {
      toast.error("Please enter the target job title");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { 
          resumeText: textToAnalyze,
          jobTitle,
          industry 
        }
      });

      if (error) throw error;
      if (!data?.analysis) throw new Error('No analysis received');

      setAnalysis(data.analysis);
      toast.success("Resume analysis complete!");
    } catch (error) {
      console.error("Error analyzing resume:", error);
      toast.error(error instanceof Error ? error.message : "Failed to analyze resume. Please try again.");
      setAnalysis(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Panel - Input Section */}
      <div className="w-[400px] border-r bg-muted/10 p-6 overflow-y-auto">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Resume Analyzer</h2>
          <p className="text-sm text-muted-foreground">
            Optimize your resume for ATS and get detailed feedback
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Target Job Title</Label>
            <Input
              placeholder="e.g. Software Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            <Label>Industry (Optional)</Label>
            <Input
              placeholder="e.g. Technology"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resume Content
            </Label>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="w-full"
            >
              <FileUp className="mr-2 h-4 w-4" />
              Upload Resume
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className="hidden"
            />
            <p className="text-xs text-muted-foreground text-center">or paste your resume text below</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Playground/Output */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="border-b p-2 flex items-center justify-between bg-muted/5">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <PenLine className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="sm">
              <Clipboard className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 grid grid-rows-2 overflow-hidden">
          {/* Input Editor */}
          <div className="border-b p-4 overflow-hidden">
            <Textarea
              placeholder="Paste your resume text here..."
              className="min-h-full font-mono text-sm resize-none"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              disabled={isAnalyzing}
            />
          </div>

          {/* Analysis Output */}
          <div className="p-4 overflow-auto bg-muted/5">
            {analysis ? (
              <div className="space-y-4">
                <div className="prose prose-sm max-w-none">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <Edit3 className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">No Analysis Yet</p>
                <p className="text-sm">
                  Upload a resume or paste your text above to get started
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <Button 
            className="w-full"
            onClick={() => analyzeResume()}
            disabled={isAnalyzing || !resumeText.trim()}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Analyze Resume
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
