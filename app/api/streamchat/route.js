// app/api/chat/route.js
import OpenAI from 'openai';

// 配置 SiliconFlow 参数
const openai = new OpenAI({
  baseURL: 'https://api.siliconflow.cn/v1', // 网页3/8提到的关键配置
  apiKey: 'sk-lrddtwsgbghfmknjpydsfvigyipyeipdpkscfedzuyjwlggl',
});

export async function POST(req) {
  const { messages, model } = await req.json();

  try {
    const stream = await openai.chat.completions.create({
      model: model || 'Pro/deepseek-ai/DeepSeek-V3', // 网页3的模型选择方案
      messages,
      stream: true, // 启用流式传输
      timeout: 60000, // 设置60秒超时
      maxRetries: 3,  // 设置最大重试次数
    });

    const readableStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        }
        controller.close();
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: error.message || '服务不可用',
      code: error.status || 500
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
