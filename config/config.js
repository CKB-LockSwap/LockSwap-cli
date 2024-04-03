const fs = require('fs');

function readConfig() {
    // 读取配置文件
    const configFile = './config.json';
    const configData = fs.readFileSync(configFile, 'utf8');

    // 解析 JSON 数据
    const config = JSON.parse(configData);
    
    return config;
}

module.exports = { readConfig };
