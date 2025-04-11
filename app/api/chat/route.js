import { createDeepSeek } from '@ai-sdk/deepseek';
import { generateText, streamText } from 'ai';
import { NextResponse } from 'next/server';

const deepseek = createDeepSeek({
  apiKey: 'sk-5315cdf5738d42be9f602c870868be05',
});

export async function POST(req) {
  try {
    const { messages } = await req.json();
    console.log(messages);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // const { text } = await generateText({
    //   model: deepseek('deepseek-chat'),
    //   prompt: '你好，请介绍一下你自己',
    // });

    const result = streamText({
      model: deepseek('deepseek-chat'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
