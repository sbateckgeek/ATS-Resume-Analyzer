
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast.error("Please enter your resume text first");
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume");
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      toast.success("Resume analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze resume. Please try again.");
      console.error("Error analyzing resume:", error);
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
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Resume</CardTitle>
            <CardDescription>
              Paste your resume text below for AI-powered analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your resume text here..."
              className="min-h-[400px] font-mono"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
            <Button 
              className="mt-4 w-full"
              onClick={analyzeResume}
              disabled={isAnalyzing || !resumeText.trim()}
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Section */}
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
                <div className="p-4 bg-muted rounded-lg">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
                <AlertCircle className="h-12 w-12 mb-4" />
                <p>Your resume analysis will appear here</p>
                <p className="text-sm">Upload your resume to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
