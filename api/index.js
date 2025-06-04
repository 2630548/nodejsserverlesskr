const fetch = require('node-fetch')

module.exports = async (req, res) => {
  try {
    // 从 Header 获取目标网址
    const targetUrl = req.headers['x-target-url']
    if (!targetUrl) {
      return res.status(400).json({ error: '缺少 x-target-url Header' })
    }

    // 验证 URL 格式
    try {
      new URL(targetUrl)
    } catch (error) {
      return res.status(400).json({ error: '无效的 x-target-url', details: error.message })
    }

    // 发起请求到目标网址
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'video/mp2t' // 确保请求 MP2T 格式
      }
    })

    // 检查响应状态
    if (!response.ok) {
      return res.status(response.status).json({ error: '无法获取视频数据', status: response.status })
    }

    // 获取视频流
    const stream = response.body

    // 设置响应头
    res.setHeader('Content-Type', 'video/mp2t')
    res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域，Cloudflare 可访问
    res.setHeader('Cache-Control', 'no-cache') // 避免缓存问题

    // 流式传输数据
    stream.pipe(res)
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: '服务器错误', details: error.message })
  }
}
