interface Env {
  DEFAULT_API_URL?: string;
  DEFAULT_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { 
      prompt, 
      model = 'black-forest-labs/FLUX.2-dev',
      width = 1024,
      height = 1024,
      baseURL,
      apiKey 
    } = await context.request.json();

    const apiUrl = baseURL || context.env.DEFAULT_API_URL || 'https://fluxes.zeabur.app';
    const key = apiKey || context.env.DEFAULT_API_KEY || '1';

    const response = await fetch(`${apiUrl}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        prompt,
        size: `${width}x${height}`,
        n: 1,
        response_format: 'url'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Image generation failed: ${error}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      images: data.data?.map((img: any) => img.url || img.b64_json) || [],
      model
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}