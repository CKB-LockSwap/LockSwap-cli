const { hd,config, helpers  } = require('@ckb-lumos/lumos');
const { getAddressByPrivateKey } = require('../tools/utils.js');
require("dotenv").config();

const CONFIG = config.predefined.AGGRON4;

class GenerateAccount {
    execute() {
        const privateKey = this.generateFirstHDPrivateKey();
        const address = getAddressByPrivateKey(privateKey);
        console.log('privateKey: ', privateKey);
        console.log('address: ', address);
    }

    generateFirstHDPrivateKey() {
        // const myMnemonic = mnemonic.generateMnemonic();
        // const seed = mnemonic.mnemonicToSeedSync(myMnemonic);

        // const extendedPrivKey = ExtendedPrivateKey.fromSeed(seed);
        // return extendedPrivKey.privateKeyInfo(AddressType.Receiving, 0).privateKey;
        // const privateKey = '0x' + Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join("");
        const privateKey = '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';

        return privateKey;
    }
}

module.exports = GenerateAccount;
