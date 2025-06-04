// api/fetch.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        // 访问 example.com
        const response = await fetch('https://example.com');
        const html = await response.text();

        // 构造 JSON 数据
        const data = {
            url: 'https://www.google.com',
            content: html
        };

        // 将 JSON 数据转换为 Base64 编码
        const jsonString = JSON.stringify(data);
        const base64Encoded = Buffer.from(jsonString).toString('base64');

        // 返回 Base64 编码的 JSON 数据
        res.status(200).json({
            status: 'success',
            data: base64Encoded
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};
