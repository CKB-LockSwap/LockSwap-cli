const { readConfig } = require("../config/config.js");

const {
  hd,
  config,
  helpers,
  RPC,
  Indexer,
  Address,
  utils,
  BI,
} = require("@ckb-lumos/lumos");
const { number } = require("@ckb-lumos/codec");
const {
  getAddressByPrivateKey,
  parseExchangeOutputsData,
  dumpExchangeOutputsData,
} = require("../tools/myutils.js");
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const rpc = new RPC(CKB_RPC_URL);
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL);

config.initializeConfig(config.predefined.AGGRON4);

class SearchOrder {
  async execute() {
    console.log("This is SearchOrder");
    const config = readConfig();

    console.log("config:", config.password);

    const privateKey =
      "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const address = getAddressByPrivateKey(privateKey);
    const lockScript = utils.computeScriptHash(helpers.parseAddress(address));

    console.log("Hello!");

    // await this.getFreeSudtCells(address, lockScript);

    // await console.log(
    //   parseExchangeOutputsData("0x50c30000000000000000000000000000")
    // );
    // await console.log(dumpExchangeOutputsData(50000, 50000));

    console.log(await this.getOrderCellArray(lockScript));
  }

  async getFreeSudtCells(address, sudtArgs) {
    const collector = indexer.collector({
      lock: helpers.parseAddress(address),
      type: {
        codeHash: config.predefined.AGGRON4.SCRIPTS["SUDT"].CODE_HASH,
        hashType: config.predefined.AGGRON4.SCRIPTS["SUDT"].HASH_TYPE,
        args: sudtArgs,
      },
    });

    let cellArray = new Array();

    for await (const cell of collector.collect()) {
      cellArray.push(cell);
    }
    console.log(cellArray);

    return cellArray;
  }

  async getFreeSudtTokenAmount(address, sudtArgs) {
    const collector = indexer.collector({
      lock: helpers.parseAddress(address),
      type: {
        codeHash: config.predefined.AGGRON4.SCRIPTS["SUDT"].CODE_HASH,
        hashType: config.predefined.AGGRON4.SCRIPTS["SUDT"].HASH_TYPE,
        args: sudtArgs,
      },
    });

    let amount = BI.from(0);

    for await (const cell of collector.collect()) {
      amount = amount.add(number.Uint128LE.unpack(cell.data));
    }

    return amount.toNumber();
  }

  async getOrderCellArray(sudtArgs) {
    const collector = indexer.collector({
      lock: {
        codeHash:
          "0x00000000000000000000000000000000000000000000000000545950455f4944",
        hashType: "type",
        args: "0x740f2f6ecfd263a75baf3c83baf34aac1e68b40d00e31289910a2e848f520ec2", // This might be arbitrary
      },
      type: {
        codeHash: config.predefined.AGGRON4.SCRIPTS["SUDT"].CODE_HASH,
        hashType: config.predefined.AGGRON4.SCRIPTS["SUDT"].HASH_TYPE,
        args: sudtArgs,
      },
    });

    let orderCellArray = new Array();

    for await (const orderCell of collector.collect()) {
      orderCellArray.push(orderCell);
    }

    return orderCellArray;
  }
}

module.exports = SearchOrder;
