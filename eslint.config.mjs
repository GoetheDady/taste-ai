import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**'],
  },
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.tsx'],
    rules: {
      quotes: ['error', 'single'], // 使用单引号
      'jsx-quotes': ['error', 'prefer-double'], // 在 JSX 属性中使用双引号
      semi: ['error', 'always'], // 强制使用分号
      'no-trailing-spaces': 'error', // 禁止行尾有空格
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }], // 不允许多个空行
      'eol-last': ['error', 'always'], // 文件末尾需要空行
      'no-empty': ['error', { allowEmptyCatch: true }], // 禁止空块语句
      'no-extra-semi': 'error', // 禁止不必要的分号
      'max-len': ['error', {
        code: 100,               // 每行代码最多100个字符
        tabWidth: 2,             // tab等于2个空格
        ignoreComments: true,    // 忽略注释
        ignoreUrls: true,        // 忽略URL
        ignoreStrings: true,     // 忽略字符串字面量
        ignoreTemplateLiterals: true, // 忽略模板字符串
        ignoreRegExpLiterals: true,   // 忽略正则表达式
      }],
    },
  },
];

export default eslintConfig;
