'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAtom, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { cn } from '@/lib/utils';
import StableTextarea from '@/components/ui/StableTextarea';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';

export default function ChatClient() {
  const [isDeepThinking, setIsDeepThinking] = useState(false);
  const [messages, setMessages] = useState([{
    role: 'user',
    content: '你好，我是小明'
  }, {
    role: 'assistant',
    content: '你好，我是一个AI助手。'
  }]);
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
    <div className="w-full h-full relative flex flex-col items-center px-4">
      {
        messages.length !== 0 && (
          <div
            className="max-w-3xl mx-auto flex-1 w-full pt-4"
          >
            {
              messages.map((message, index) => message.role === 'assistant' ? (
                <div key={index} className="flex flex-col max-w-3xl">
                  <div className="text-base">{message.content}</div>
                </div>
              ): (
                <div key={index} className="flex flex-col items-end max-w-3xl">
                  <div className="text-base">{message.content}</div>
                </div>
              ))
            }
          </div>
        )
      }
      <div
        className={
          cn(
            'max-w-3xl w-full',
            messages.length === 0 ? 'flex-1 flex items-center' : 'pb-4 sticky bottom-0',
            'bg-white transform transition-all duration-200',
            messages.length === 0 && 'flex-1 flex items-center'
          )
        }
      >
        <div className={cn(
          'border border-gray-200 rounded-3xl shadow-lg',
          messages.length === 0 ? 'w-full' : ''
        )}>
          <StableTextarea
            placeholder="需要知道什么"
            autoSize={{ minRows: 1, maxRows: 6 }}
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full resize-none px-4 py-4 focus-visible:outline-none text-base"
          />
          <div className="w-full p-4 flex justify-between">
            <Toggle variant="outline">
              <FontAwesomeIcon icon={faAtom}/>
              深度思考
            </Toggle>
            <Button>
              <FontAwesomeIcon icon={faPaperPlane}/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
