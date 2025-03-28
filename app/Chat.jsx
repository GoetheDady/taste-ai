import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faAtom } from '@fortawesome/free-solid-svg-icons';
import Textarea from '@/app/Textarea';

function Chat() {
  return (
    <div className="w-full h-full flex flex-col">
      <div
        className="w-full h-14 shadow-md flex items-center justify-center text-2xl font-bold"
      >
        标题
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-0 left-0 right-0 bottom-0 px-6 overflow-y-auto">
          <div className="w-[800px] h-full mx-auto flex flex-col relative">
            <div className="flex-1">
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>
              <div className="h-30">132412341324</div>

            </div>
            <div className="sticky w-auto bg-white flex flex-col bottom-0">
              <div className="bg-gray-200 rounded-2xl p-4 shadow-md">
                <Textarea
                  placeholder="请输入内容"
                  className="w-full resize-none outline-none text-base"
                  autoSize={{ minRows: 2, maxRows: 10 }}
                />
                <div className="flex items-center justify-between">
                  <Toggle variant="outline"  className="">
                    <FontAwesomeIcon icon={faAtom} className="w-5"/>
                    深度思考
                  </Toggle>
                  <Button variant="default" className="rounded-full size-10">
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
