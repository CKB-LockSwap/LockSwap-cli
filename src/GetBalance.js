const { hd, config, helpers } = require('@ckb-lumos/lumos');
const { getAddressByPrivateKey } = require('../tools/utils.js');
const { RPC, Indexer } = require("@ckb-lumos/indexer");

const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";

const rpc = new RPC(CKB_RPC_URL);
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL);

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;

class GetBalance {
    constructor() {
        this.privateKey = privateKey;
    }

    async getCKBBalance() {
        const address = getAddressByPrivateKey(this.privateKey);
        const collector = indexer.collector({
            lock: helpers.parseAddress(address),
        });
    
        let capacities = BigInt(0);
        for await (const cell of collector.collect()) {
            capacities += BigInt(cell.cellOutput.capacity);
        }
    
        console.log(`Balance: ${capacities / BigInt(10 ** 8)} CKB`);
        return capacities;
    }
}

module.exports = GetBalance;
