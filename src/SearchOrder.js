const { readConfig } = require('../config/config.js');

const { hd, config, helpers, RPC, Indexer  } = require('@ckb-lumos/lumos');
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const rpc = new RPC(CKB_RPC_URL)
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL)

class SearchOrder {
    async execute() {
        console.log('This is SearchOrder');
        const config = readConfig();

        await this.getSudtCells();
    }
    
    async getSudtCells() {
        const collector = indexer.collector({
            type: {
                code_hash: config.code_hash,
                hash_type: config.hash_type,
                args: config.args
            }})

        for await(const cell of collector.collect()) {
            console.log(cell.data);
        }
    }
}

module.exports = SearchOrder;
