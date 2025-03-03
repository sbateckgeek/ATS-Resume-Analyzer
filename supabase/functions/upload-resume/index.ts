
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    
    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: 'No file uploaded' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    console.log(`Processing uploaded file: ${file.name}, type: ${file.type}, size: ${file.size} bytes`);

    // For this mock implementation, we'll just return a dummy text extraction
    // In a real implementation, you would use different parsing libraries depending on file type
    
    // Mock text extraction based on file type
    let extractedText = '';
    
    if (file.type === 'application/pdf') {
      extractedText = `This is a mock extraction from a PDF file: ${file.name}\n\nSkills:\n- JavaScript\n- React\n- Node.js\n\nExperience:\n- Frontend Developer at Tech Corp (2020-Present)\n- Junior Developer at Startup Inc (2018-2020)\n\nEducation:\n- BS Computer Science, University College (2018)`;
    } else if (file.type.startsWith('image/')) {
      extractedText = `This is a mock extraction from an image file: ${file.name}\n\nSkills:\n- Python\n- Data Analysis\n- Machine Learning\n\nExperience:\n- Data Scientist at AI Solutions (2019-Present)\n- Research Assistant at University Lab (2017-2019)\n\nEducation:\n- MS Data Science, Tech University (2017)`;
    } else {
      throw new Error(`Unsupported file type: ${file.type}`);
    }

    console.log('Successfully extracted text from file');
    
    return new Response(
      JSON.stringify({ text: extractedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in upload-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process file. Please try again.',
        details: error instanceof Error ? error.message : String(error)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
