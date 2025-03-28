import Request from './request';

const requestClient = async ({ url, method = 'GET', data = null, onStream = null }) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP 错误: ${response.status}`);
  }

  // 如果提供了onStream回调，使用流式处理
  if (onStream && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      onStream(chunk);
    }

    return true;
  }

  // 普通响应处理
  return await response.json();
};

export default requestClient;
