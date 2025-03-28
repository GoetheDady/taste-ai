import { NextResponse } from 'next/server';

/**
 * 统一响应格式
 * @param {any} data - 返回的数据
 * @param {string} message - 返回的消息
 * @param {number} code - 状态码，默认200
 * @param {boolean} success - 是否成功，默认true
 */
export function apiResponse(data = null, message = '操作成功', code = 200, success = true) {
  return NextResponse.json({
    code,
    message,
    data,
    success,
    timestamp: new Date().getTime(),
  });
}
