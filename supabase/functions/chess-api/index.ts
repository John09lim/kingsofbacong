
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CHESS_API_KEY = Deno.env.get("CHESS_RAPID_API_KEY");
const CHESS_API_HOST = "chess-api1.p.rapidapi.com";

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { endpoint, params } = await req.json();

    // Validate the request
    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "Missing required 'endpoint' parameter" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate that we have the API key
    if (!CHESS_API_KEY) {
      console.error("Missing CHESS_RAPID_API_KEY environment variable");
      return new Response(
        JSON.stringify({ error: "Chess API configuration error" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct query string from params
    const queryParams = params ? new URLSearchParams(params).toString() : '';
    const url = `https://${CHESS_API_HOST}${endpoint}${queryParams ? `?${queryParams}` : ''}`;

    console.log(`Making request to Chess API: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": CHESS_API_KEY,
        "X-RapidAPI-Host": CHESS_API_HOST,
      },
    });

    const data = await response.json();
    
    // Return the response from the Chess API
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: response.status,
    });
  } catch (error) {
    console.error("Error in chess-api function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
