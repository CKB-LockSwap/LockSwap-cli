const { hd, config, helpers } = require('@ckb-lumos/lumos');

function getAddressByPrivateKey(privateKey) {
    const args = hd.key.privateKeyToBlake160(privateKey);
    const template = config.predefined.AGGRON4.SCRIPTS["SECP256K1_BLAKE160"];
    const lockScript = {
        codeHash: template.CODE_HASH,
        hashType: template.HASH_TYPE,
        args: args,
    };

    return helpers.encodeToAddress(lockScript, { config: config.predefined.AGGRON4 });
}

/**
 * Parses exchange outputs data.
 *
 * @param {string} outputs - the outputs_data string in hex to be parsed
 * @return {dict} an dict containing amount and price
 */
function parseExchangeOutputsData(outputsData) {
    
    outputsData = outputsData.slice(2);

    const amountBytes = outputsData.slice(0, 16);
    const priceBytes = outputsData.slice(16, 32);

    const reverseAmountBytes = amountBytes.match(/.{1,2}/g).reverse().join('');
    const reversePriceBytes = priceBytes.match(/.{1,2}/g).reverse().join('');

    const amount = parseInt(reverseAmountBytes, 16);
    const price = parseInt(reversePriceBytes, 16);

    return [amount, price];
}

module.exports = { getAddressByPrivateKey };
