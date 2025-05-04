
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const CHESS_API_KEY = Deno.env.get("CHESS_RAPID_API_KEY") || "a0300f8454msh9b4ee5e304028ebp16e757jsnff1958562942"; 
const CHESS_API_HOST = "chess-puzzles.p.rapidapi.com";

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

    let url;
    let headers = {
      "X-RapidAPI-Key": CHESS_API_KEY,
      "X-RapidAPI-Host": CHESS_API_HOST,
    };

    if (endpoint === '/puzzles') {
      // Handle puzzle-specific endpoint with special formatting for the chess-puzzles API
      url = `https://${CHESS_API_HOST}`;
      console.log(`Making request to Chess Puzzles API: ${url} with params:`, params);
    } else {
      // Construct query string from params for other endpoints
      const queryParams = params ? new URLSearchParams(params).toString() : '';
      url = `https://${CHESS_API_HOST}${endpoint}${queryParams ? `?${queryParams}` : ''}`;
      console.log(`Making request to Chess API: ${url}`);
    }

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from Chess API: ${response.status} ${response.statusText}`, errorText);
      return new Response(
        JSON.stringify({ error: `API returned ${response.status}: ${response.statusText}`, details: errorText }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

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
