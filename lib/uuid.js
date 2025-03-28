import { v4 as uuidv4 } from 'uuid';

/**
 * 生成一个短的UUID
 * @returns {string}
 */
export default function generateUUID() {
  return uuidv4().replace(/-/g, '');
}
