```
npm run  swap
```


```
读取配置
const { readConfig } = require('../config/config.js');


const config = readConfig();
console.log("config:", config.password);
console.log("config:", config.data);
```