import StableTextarea from '@/components/ui/StableTextarea';
import { cn } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain } from '@fortawesome/free-solid-svg-icons';

export default function ChatClient({
  messages, input, setInput, handleKeyDown, isDeepThinking, setIsDeepThinking
}) {
  return (
    <div className="w-full h-full relative flex flex-col items-center px-4">
      {
        messages.length !== 0 && (
          <div
            className="max-w-3xl mx-auto flex-1 w-full"
          >
            {
              messages.map((message, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-sm text-gray-500">{message.role}</div>
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
            className="w-full resize-none px-4 py-2 focus-visible:outline-none text-base"
          />
          <div className="w-full p-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBrain} size="lg" />
              深度思考
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
