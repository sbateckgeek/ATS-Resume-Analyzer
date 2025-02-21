
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }

    // Parse the request body
    const requestData = await req.json();
    console.log('Received request with data:', { hasResumeText: !!requestData?.resumeText });

    if (!requestData?.resumeText) {
      return new Response(
        JSON.stringify({ error: 'Resume text is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const { resumeText } = requestData;

    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    console.log('Creating analysis prompt...');
    const prompt = `
      Analyze this resume and provide feedback on:
      1. ATS Optimization suggestions
      2. Key strengths and weaknesses
      3. Missing important keywords or sections
      4. Formatting improvements
      5. Overall score out of 100

      Resume:
      ${resumeText}
    `;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    console.log('Received response from Gemini API');
    
    if (!result.response) {
      throw new Error('No response received from Gemini API');
    }

    const analysis = result.response.text();
    console.log('Successfully processed response');

    return new Response(
      JSON.stringify({ analysis }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    
    // Create a user-friendly error message
    const errorMessage = error instanceof Error 
      ? error.message
      : 'An unexpected error occurred while analyzing the resume';

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : String(error)
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
