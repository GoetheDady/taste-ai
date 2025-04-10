'use client';
import { useState } from 'react';
import ChatServer from './Chat.server';

export default function ChatClient() {
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift+Enter 换行，不需要额外处理
        return;
      } else {
        // 只有Enter才提交消息
        e.preventDefault();
        if (input.trim() !== '') {
          setMessages([...messages, { role: 'user', content: input }]);
          setInput('');
        }
      }
    }
  };
  return (
    <ChatServer
      messages={messages}
      input={input}
      setInput={setInput}
      handleKeyDown={handleKeyDown}
      isDeepThinking={isDeepThinking}
      setIsDeepThinking={setIsDeepThinking}
    />
  );
}
