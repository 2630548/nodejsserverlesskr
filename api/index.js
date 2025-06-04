const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.google.com');
    const data = await response.text();
     // 将网页内容转换为 base64
    const base64Data = Buffer.from(data).toString('base64');
    
    // 设置响应头
    res.status(200).json({
      success: true,
      data: base64Data
    });
  } catch (error) {
    res.status(500).send('Error fetching example.com: ' + error.message);
  }
};
