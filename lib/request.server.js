import Request from './request';

const requestServer = new Request({
  baseUrl: 'https://api.siliconflow.cn/v1/',
  headers: {
    'Authorization': `Bearer ${process.env.SILICONFLOW_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default requestServer;
