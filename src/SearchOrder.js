const { readConfig } = require('../config/config.js');

const { hd, config, helpers, RPC, Indexer, Address, utils, BI } = require('@ckb-lumos/lumos');
const { number } = require('@ckb-lumos/codec')
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const rpc = new RPC(CKB_RPC_URL)
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL)

config.initializeConfig(config.predefined.AGGRON4);

class SearchOrder {
    async execute() {
        console.log('This is SearchOrder');
        const config = readConfig();

        console.log("config:", config.password);

        const privateKey = "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
        const address = require('../tools/utils.js').getAddressByPrivateKey(privateKey);
        const lockScript = utils.computeScriptHash(helpers.parseAddress(address));

        console.log("Hello!")
        
        await this.getSudtCells(address, lockScript);
    }
    
    async getSudtCells(address, sudtArgs) {
        const collector = indexer.collector({
            lock: helpers.parseAddress(address),
            type: {
                codeHash: config.predefined.AGGRON4.SCRIPTS['SUDT'].CODE_HASH,
                hashType: config.predefined.AGGRON4.SCRIPTS['SUDT'].HASH_TYPE,
                args: sudtArgs
            }
        });

        let cellArray = new Array();

        for await(const cell of collector.collect()){
            cellArray.push(cell);
        }
        console.log(cellArray);
        
        return cellArray;
    }

    async getFreeSudtTokenAmount(address, sudtArgs) {
        const collector = indexer.collector({
            lock: helpers.parseAddress(address),
            type: {
                codeHash: config.predefined.AGGRON4.SCRIPTS['SUDT'].CODE_HASH,
                hashType: config.predefined.AGGRON4.SCRIPTS['SUDT'].HASH_TYPE,
                args: sudtArgs
            }
        });

        let amount = BI.from(0);

        for await(const cell of collector.collect()) {
            amount = amount.add(number.Uint128LE.unpack(cell.data));
        }

        return amount.toNumber();
    }


}

module.exports = SearchOrder;
