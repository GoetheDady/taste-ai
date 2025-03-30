'use client';

import { useState, Fragment, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faAtom } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@/app/Textarea';
import generateUUID from '@/lib/uuid';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import Loading from '@/components/ui/loading';
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils';
import { useStreamChat } from '@/hooks/useStreamChat';

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { isLoading, streamChat } = useStreamChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 追加用户信息
    const userMessage = { id: generateUUID(), role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // 清空输入框
    setInput('');
    
    // 使用 hook 处理流式请求
    await streamChat(updatedMessages, 'Pro/deepseek-ai/DeepSeek-R1', setMessages);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="w-full h-14 shadow-md flex items-center justify-center text-2xl font-bold"
      >
        标题
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 px-6 overflow-y-auto">
          <div className="w-[800px] h-full mx-auto flex flex-col relative pt-8">
            <div className="flex-1">
              {
                messages.map((message, index) => {
                  if (message.role === 'assistant') {
                    return (
                      <div key={message.id} data-role={message.role} className="flex mb-8">
                        <div className="size-10 bg-gray-200 flex items-center justify-center rounded-full mr-4 shrink-0">
                          <FontAwesomeIcon icon={faRobot} />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4">
                          {
                            isLoading && !message.isStop ? (
                              <Loading />
                            ) : (
                              <Fragment>
                                {
                                  message.reasoning && (
                                    <div
                                      className={cn(
                                        ' p-2 rounded-lg mb-2 text-sm leading-6 text-white',
                                        'bg-gradient-to-tr from-blue-400 to-purple-400'
                                      )}
                                    >
                                      { message.reasoning }
                                    </div>
                                  )
                                }
                                {
                                  message.content && (
                                    <Markdown>{ message.content }</Markdown>
                                  )
                                }
                              </Fragment>
                            )
                          }
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={message.id} data-role={message.role} className="flex flex-row-reverse mb-8">
                      <div className="size-10 bg-gray-200 flex items-center justify-center rounded-full ml-4 shrink-0">
                        <FontAwesomeIcon icon={faUser} />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4">
                        { message.content }
                      </div>
                    </div>
                  );
                })
              }
              <div ref={messagesEndRef} />
            </div>
            <div className="sticky w-auto bg-white flex flex-col bottom-0">
              <div className="bg-gray-200 rounded-2xl p-4 shadow-md">
                <Textarea
                  placeholder="请输入内容"
                  className="w-full resize-none outline-none text-base"
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    // 回车不换行，只有 shift+enter 换行，有输入法的时候回车不发送
                    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      if (input.trim() !== '') {
                        handleSubmit(e);
                      }
                    }
                  }}
                />
                <div className="flex items-center justify-between">
                  <Toggle variant="outline"  className="">
                    <FontAwesomeIcon icon={faAtom} className="w-5"/>
                    深度思考
                  </Toggle>
                  <Button
                    variant="default"
                    className="rounded-full size-10"
                    onClick={handleSubmit}
                    disabled={isLoading || input.trim() === ''}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
              </div>
              <div className="text-xs p-2 text-gray-500 flex items-center justify-center flex-1">内容由 AI 生成，请仔细甄别</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
