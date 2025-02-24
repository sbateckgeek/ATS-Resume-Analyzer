
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

const OPENROUTER_API_KEY = "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";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log('Received request with data:', { hasResumeText: !!requestData?.resumeText });

    if (!requestData?.resumeText) {
      return new Response(
        JSON.stringify({ error: 'Resume text is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const { resumeText } = requestData;

    console.log('Sending request to OpenRouter API...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Resume Analyzer'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: "You are a quick and efficient resume analyzer. Provide concise feedback focusing on key points."
          },
          {
            role: "user",
            content: `Analyze this resume and provide brief feedback in these areas:
1. ATS Score (/100)
2. Key missing keywords
3. Format issues
4. Quick improvements

Resume: ${resumeText}`
          }
        ],
        temperature: 0.3, // Lower temperature for more focused responses
        max_tokens: 500 // Limit response length
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error('Failed to analyze resume. Please try again.');
    }

    const data = await response.json();
    console.log('Received response from OpenRouter API');

    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response from analysis service');
    }

    const analysis = data.choices[0].message.content;
    console.log('Successfully processed response');

    return new Response(
      JSON.stringify({ analysis }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in analyze-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to analyze resume. Please try again.',
        details: error instanceof Error ? error.message : String(error)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
