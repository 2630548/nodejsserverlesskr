// api/proxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  const targetUrl = req.query.url; // 从查询参数获取目标 URL
  if (!targetUrl) {
    res.status(400).json({ error: 'URL 参数缺失' });
    return;
  }

  // 创建代理
  createProxyMiddleware({
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      ('^/api?url='+targetUrl): '', // 移除路径中的 /api/proxy
    },
    onProxyReq: (proxyReq) => {
      // 可选：设置额外的请求头
      proxyReq.setHeader('X-Forwarded-Host', req.headers.host);
    },
  })(req, res);
};
