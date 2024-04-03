const { hd, config, helpers } = require('@ckb-lumos/lumos');
const { CONFIG } = require("@ckb-lumos/config-manager");

function getAddressByPrivateKey(privateKey) {
    const args = hd.key.privateKeyToBlake160(privateKey);
    const template = config.predefined.AGGRON4.SCRIPTS["SECP256K1_BLAKE160"];
    const lockScript = {
        codeHash: template.CODE_HASH,
        hashType: template.HASH_TYPE,
        args: args,
    };

    return helpers.encodeToAddress(lockScript, { config: CONFIG });
}

module.exports = { getAddressByPrivateKey };
