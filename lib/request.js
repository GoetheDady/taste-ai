/**
 * 请求类
 * @param {string} baseUrl - 基础URL
 * @param {Object} headers - 请求头
 */
class Request {
  constructor({ baseUrl, headers = {} }) {
    // 检查是否在浏览器环境中，并获取当前域名
    const defaultBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    this.baseUrl = baseUrl || defaultBaseUrl;
    this.headers = {
      ...headers,
    };
  }

  /**
   * 获取请求
   * @param {string} url - 请求URL
   * @param {Object} params - 请求参数
   * @param {Object} options - 请求选项
   * @returns {Promise} - 返回Promise对象
   */
  get(url = '', params = {}, options = {}) {
    if (url === '') {
      throw new Error('url is required');
    }

    let query = '';
    if (Object.keys(params).length > 0) {
      query = `?${new URLSearchParams(params)}`;
    }

    return fetch(`${this.baseUrl}${url}${query}`, {
      method: 'GET',
      headers: this.headers,
      ...options
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 检查响应头的Content-Type是否包含json
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }

      return response;
    });
  }

  /**
   * 发送POST请求
   * @param {string} url - 请求URL
   * @param {Object} data - 请求数据
   * @param {Object} options - 请求选项
   * @returns {Promise} - 返回Promise对象
   */
  post(url = '', data = {}, options = {}) {
    if (url === '') {
      throw new Error('url is required');
    }

    return fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
      ...options
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 检查响应头的Content-Type是否包含json
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }

      return response;
    });
  }
}

export default Request;
