
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LICHESS_TOKEN = Deno.env.get('LICHESS_TOKEN');
    if (!LICHESS_TOKEN) {
      throw new Error('LICHESS_TOKEN is not set');
    }

    const body = await req.json();
    const { endpoint, params } = body;

    if (!endpoint) {
      return new Response(
        JSON.stringify({ error: "endpoint is required" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Construct the Lichess API URL
    const baseURL = "https://lichess.org/api";
    let url = `${baseURL}/${endpoint}`;
    
    // Add query parameters if they exist
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        queryParams.append(key, value.toString());
      });
      url = `${url}?${queryParams.toString()}`;
    }

    console.log(`Calling Lichess API: ${url}`);

    // Make the authenticated request to Lichess API
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${LICHESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Lichess API error: ${response.status} ${response.statusText}`, errorData);
      return new Response(
        JSON.stringify({ error: `Lichess API error: ${response.status}` }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || '';
    let data;
    
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return new Response(
      JSON.stringify({ data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error calling Lichess API:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
