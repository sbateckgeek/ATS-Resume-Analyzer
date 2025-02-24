import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Upload, AlertCircle, Loader2, FileUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
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

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-resume', {
        body: { resumeText: textToAnalyze }
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
    <div className="container mx-auto p-4 lg:p-8 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Resume Analyzer & ATS Optimizer</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Resume</CardTitle>
            <CardDescription>
              Upload a PDF/image or paste your resume text below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="w-full"
              >
                <FileUp className="mr-2 h-4 w-4" />
                Upload File
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Or paste your resume text here..."
                className="min-h-[400px] font-mono"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                disabled={isAnalyzing}
              />
              <Button 
                className="mt-4 w-full"
                onClick={() => analyzeResume()}
                disabled={isAnalyzing || !resumeText.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {resumeText ? 'Analyzing...' : 'Extracting Text...'}
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Analyze Resume
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ATS Analysis</CardTitle>
            <CardDescription>
              AI-powered insights and suggestions for your resume
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg whitespace-pre-line">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p>Your resume analysis will appear here</p>
                <p className="text-sm">Upload a PDF or image to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
