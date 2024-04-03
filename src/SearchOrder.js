const { readConfig } = require('../config/config.js');

const { hd, config, helpers, RPC, Indexer  } = require('@ckb-lumos/lumos');
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const rpc = new RPC(CKB_RPC_URL)
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL)

class SearchOrder {
    execute() {
        console.log('This is SearchOrder');
        const config = readConfig();

        console.log("config:", config.password);
        this.getSudtCells();
    }
    
    getSudtCells() {
        const collector = indexer.collector({
            type: {
                "code_hash": "0xc5e5dcf215925f7ef4dfaf5f4b4f105bc321c02776d6e7d52a1db3fcd9d011a4",
                "hash_type": "type",
                "args": "0x20df773adb5ed3b5fae09ebb97504a9c7db3b9a0ff534e96e829dd585146e20c"
            }})

        for await(const cell of collector.collect()) {
            console.log(cell.data);
        }

    }
}

module.exports = SearchOrder;

SearchOrder.getSudtCells()