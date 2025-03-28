import { apiResponse } from '@/lib/api-utils';
import requestServer from '@/lib/request.server';

export async function GET(req) {
  return apiResponse({ greeting: 'Hello, world!' });
}

export async function POST(req) {
  const body = await req.json();
  const data = {
    model: 'Pro/deepseek-ai/DeepSeek-V3',
    messages: body.messages,
    stream: false,
    max_tokens: 512,
    stop: null,
    temperature: 0.7,
    top_p: 0.7,
    top_k: 50,
  };
  const response = await requestServer.post('/chat/completions', data);
  return apiResponse(response);
}
