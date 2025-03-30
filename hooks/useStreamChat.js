import { useState, useCallback } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import generateUUID from '@/lib/uuid';

export function useStreamChat() {
  const [isLoading, setIsLoading] = useState(false);
  
  const streamChat = useCallback(async (messages, model, onMessageUpdate) => {
    setIsLoading(true);
    
    // 创建临时AI消息对象
    const tempAIMessage = { 
      id: generateUUID(), 
      role: 'assistant', 
      content: '', 
      reasoning: '', 
      isStop: false 
    };
    
    // 初始化AI消息
    onMessageUpdate(prev => [...prev, tempAIMessage]);
    
    try {
      await fetchEventSource('/api/streamchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages,
          model: model || 'Pro/deepseek-ai/DeepSeek-R1'
        }),
        onmessage(event) {
          setIsLoading(false);
          try {
            const data = JSON.parse(event.data);
            onMessageUpdate(prev => {
              const last = prev[prev.length - 1];
              if (!last || last.role !== 'assistant') return prev;

              return [...prev.slice(0, -1), {
                ...last,
                id: data.id || last.id,
                content: last.content + (data.choices[0]?.delta?.content || ''),
                reasoning: last.reasoning + (data.choices[0]?.delta?.reasoning_content || ''),
                isStop: data.choices[0]?.finish_reason === 'stop'
              }];
            });
          } catch (e) {
            console.error('消息处理错误:', e);
          }
        },
        onclose() {
          onMessageUpdate(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'assistant') {
              return [...prev.slice(0, -1), {
                ...last,
                isStop: true
              }];
            }
            return prev;
          });
          setIsLoading(false);
        },
        onerror(err) {
          console.error('EventSource 错误:', err);
          onMessageUpdate(prev => {
            const last = prev[prev.length - 1];
            if (last?.role === 'assistant' && !last.isStop) {
              return [...prev.slice(0, -1), {
                ...last,
                content: last.content + '\n\n[连接中断，请重试]',
                isStop: true
              }];
            }
            return prev;
          });
          setIsLoading(false);
          throw err;
        }
      });
    } catch (error) {
      console.error('连接错误:', error);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    streamChat
  };
} 