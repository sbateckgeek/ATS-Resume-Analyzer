
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
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file uploaded');
    }

    // Convert file to base64 in chunks to avoid stack overflow
    const arrayBuffer = await file.arrayBuffer();
    const chunks = new Uint8Array(arrayBuffer);
    const chunkSize = 1024 * 1024; // 1MB chunks
    let binary = '';
    
    for (let i = 0; i < chunks.length; i += chunkSize) {
      const chunk = chunks.slice(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, chunk as unknown as number[]);
    }

    const base64 = btoa(binary);
    const dataUrl = `data:${file.type};base64,${base64}`;

    console.log('Sending file to OpenRouter API for text extraction...');
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://lovable.dev',
        'X-Title': 'Resume Text Extractor'
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [
          {
            role: "system",
            content: "You are a text extraction assistant. Your job is to extract text content from documents and format it cleanly."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please extract all text from this document and format it cleanly. Preserve important formatting and structure. Remove any irrelevant elements."
              },
              {
                type: "image_url",
                image_url: dataUrl
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error('Failed to extract text from file');
    }

    const data = await response.json();
    console.log('Received response from OpenRouter API');

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('No text content received from the API');
    }

    const extractedText = data.choices[0].message.content;
    console.log('Successfully extracted text');

    return new Response(
      JSON.stringify({ text: extractedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in upload-resume function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to extract text from file. Please try pasting the text directly.',
        details: error instanceof Error ? error.message : String(error)
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
