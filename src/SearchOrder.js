const { readConfig } = require('../config/config.js');

class SearchOrder {
    execute() {
        console.log('This is SearchOrder');
        const config = readConfig();
        console.log("config:", config.code_hash);
    }
}

module.exports = SearchOrder;