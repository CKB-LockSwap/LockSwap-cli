const {
  hd,
  config,
  helpers,
  RPC,
  Indexer,
  Address,
  utils,
  BI,
  commons,
} = require("@ckb-lumos/lumos");
const { number } = require("@ckb-lumos/codec");
const {
  getAddressByPrivateKey,
  parseExchangeOutputsData,
  dumpExchangeOutputsData,
} = require("../tools/myutils.js");
const { get } = require("http");
const CKB_RPC_URL = "https://testnet.ckb.dev/rpc";
const CKB_INDEXER_URL = "https://testnet.ckb.dev/indexer";
const rpc = new RPC(CKB_RPC_URL);
const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL);

class MakeOrder {
  constructor(SUDTCell, price) {
    // 构造函数
    this.SUDTCell = SUDTCell;
    this.price = price;
  }

  execute() {
    console.log("This is MakeOrder");
    console.log("This SUDTCell:", this.SUDTCell);
    console.log("This price:", this.price);

    const privateKey =
      "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
    const address = getAddressByPrivateKey(privateKey);
    const lockScript = utils.computeScriptHash(helpers.parseAddress(address));

    const bobAddress =
      "ckt1qzda0cr08m85hc8jlnfp3zer7xulejywt49kt2rr0vthywaa50xwsqgy5rtexzvhk7jt7gla8wlq5lztf79tjhg9fmd4f";
    console.log(this.transfer(address, bobAddress, 1000, privateKey));

    // this.makeOrder(address);
  }

  //   async makeOrder(address) {
  //     let txSkeleton = helpers.TransactionSkeleton({ cellProvider: indexer });
  //     txSkeleton = await commons.common.transfer(txSkeleton, [address]);
  //   }

  async transfer(from, to, capacity, privateKey) {
    let txSkeleton = helpers.TransactionSkeleton({ cellProvider: indexer });
    txSkeleton = await commons.common.transfer(
      txSkeleton,
      [from],
      to,
      BigInt(capacity)
    );
    txSkeleton = await commons.common.payFeeByFeeRate(txSkeleton, [from], 1000);
    txSkeleton = commons.common.prepareSigningEntries(txSkeleton);

    console.log(txSkeleton);

    const message = txSkeleton.get("signingEntries").get(0)?.message;
    const Sig = hd.key.signRecoverable(message, privateKey);
    const tx = helpers.sealTransaction(txSkeleton, [Sig]);

    return rpc.sendTransaction(tx, "passthrough");
  }
}

module.exports = MakeOrder;
