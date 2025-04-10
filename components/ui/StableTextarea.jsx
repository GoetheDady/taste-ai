import { useState, useEffect } from 'react';
import Textarea from 'rc-textarea';

// 创建一个包装组件，解决高度闪烁问题
export default function StableTextarea(props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 使用requestAnimationFrame确保DOM已经渲染
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <>
      {isReady ? (
        <Textarea {...props} />
      ) : (
        <div
          style={{
            minHeight: '42px',
            visibility: 'hidden'
          }}
          className={props.className}
        />
      )}
    </>
  );
}
