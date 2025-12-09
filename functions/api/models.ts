interface Env {
  DEFAULT_API_URL?: string;
  DEFAULT_API_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { baseURL, apiKey } = await context.request.json();

    const apiUrl = baseURL || context.env.DEFAULT_API_URL || 'https://fluxes.zeabur.app';
    const key = apiKey || context.env.DEFAULT_API_KEY || '1';

    const response = await fetch(`${apiUrl}/v1/models`, {
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }

    const data = await response.json();

    const models = data.data.map((model: any) => {
      const id = model.id.toLowerCase();
      let type = 'chat';
      let capabilities = ['chat'];

      if (id.includes('flux') || id.includes('dall-e') || id.includes('stable-diffusion') || id.includes('sd-')) {
        type = 'image';
        capabilities = ['image'];
      } else if (id.includes('gpt') || id.includes('claude') || id.includes('grok') || id.includes('llama')) {
        type = 'chat';
        capabilities = ['chat'];
      }

      return {
        id: model.id,
        type,
        capabilities,
        name: model.id,
        owned_by: model.owned_by || 'unknown'
      };
    });

    return new Response(JSON.stringify({ 
      models,
      count: models.length 
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