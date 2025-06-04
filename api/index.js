// /api/fetchGoogle.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // 发送 HTTP 请求获取 Google 首页内容
    const response = await fetch('https://www.google.com');
    const html = await response.text();

    // 将 HTML 内容转换为 Base64 编码
    const base64Data = Buffer.from(html).toString('base64');

    // 构建 JSON 响应
    const jsonResponse = {
      status: 'success',
      data: base64Data
    };

    // 设置响应头并返回 JSON
    res.status(200).json(jsonResponse);
  } catch (error) {
    // 错误处理
    res.status(500).json({
      status: 'error',
      message: '无法获取网页内容',
      error: error.message
    });
  }
}
