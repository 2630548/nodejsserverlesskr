const fetch = require('node-fetch');
const { spawn } = require('child_process');

// 设置可执行权限
const chmod = spawn('chmod', ['+x', './start']);




module.exports = async (req, res) => {
  try {
    var str = "test";
chmod.on('exit', (code) => {
  if (code === 0) {
    // 执行脚本
    const startScript = spawn('./start');

    startScript.stdout.on('data', (data) => {
      console.log(`输出：${data}`);
      str+='输出'+data;
    });

    startScript.stderr.on('data', (data) => {
      console.error(`${data}`);
      str+='error'+data;
    });

    startScript.on('close', (code) => {
      console.log(`子进程退出，退出码 ${code}`);
      str+='code'+code;
    });
  } else {
    console.error(`chmod 命令返回错误码 ${code}`);
      str+='code'+code;
  }
});
    
    // 使用 fetch 获取 www.google.com 的原始 HTML 数据
    const response = await fetch('https://www.google.com', {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // 检查响应状态
    if (!response.ok) {
      //throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 获取网页的原始 HTML
    const html = await response.text();

    // 设置响应头并返回数据
    res.status(response.status).send(str);
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to fetch Google page', details: error.message });
  }
};
