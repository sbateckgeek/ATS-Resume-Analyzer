
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Upload, AlertCircle, Loader2, FileUp, Copy, Edit } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

      if (error) {
        console.error("Function invocation error:", error);
        throw new Error(error.message || 'Failed to analyze resume');
      }
      
      if (!data?.analysis) {
        console.error("No analysis received:", data);
        throw new Error('No analysis received from the service');
      }

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

  const copyToClipboard = () => {
    if (analysis) {
      navigator.clipboard.writeText(analysis);
      toast.success("Analysis copied to clipboard");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Resume Analyzer & ATS Optimizer</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Your Resume</CardTitle>
              <CardDescription>
                Upload a PDF/image or paste your resume text below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => fileInputRef.current?.click()}
                disabled={isAnalyzing}
                className="w-full"
              >
                <FileUp className="mr-2 h-4 w-4" />
                Upload Resume (PDF/Image)
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
              />
              <div className="relative border rounded-md">
                <Textarea
                  placeholder="Or paste your resume text here..."
                  className="min-h-[300px] font-mono resize-none focus:ring-0 border-0 p-4"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  disabled={isAnalyzing}
                />
              </div>
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
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>ATS Analysis</CardTitle>
                  <CardDescription>
                    AI-powered insights and suggestions for your resume
                  </CardDescription>
                </div>
                {analysis && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4 mr-1" />
                      {isEditing ? "View" : "Edit"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
                  <p className="text-lg font-medium">Analyzing your resume...</p>
                  <p className="text-sm text-muted-foreground">This may take a moment</p>
                </div>
              ) : analysis ? (
                isEditing ? (
                  <Textarea
                    className="min-h-[400px] font-mono resize-none p-4"
                    value={analysis}
                    onChange={(e) => setAnalysis(e.target.value)}
                  />
                ) : (
                  <div className="p-4 bg-muted/30 rounded-lg whitespace-pre-line min-h-[400px]">
                    {analysis}
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                  <AlertCircle className="h-12 w-12 mb-4" />
                  <p className="text-lg font-medium">Your resume analysis will appear here</p>
                  <p className="text-sm">Upload a PDF or image to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
