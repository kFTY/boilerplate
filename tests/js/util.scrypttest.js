const { expect } = require('chai');
const { buildContractClass, getPreimage, toHex, Bytes } = require('scryptjs');

const { tx, loadDesc, inputIndex, inputSatoshis } = require('../../helper');

describe('Test sCrypt contract Util In Javascript', () => {
    let util;
    let preimage

    before(() => {
        const Util = buildContractClass(loadDesc('util_desc.json'));
        util = new Util();
        preimage = getPreimage(tx, util.lockingScript.toASM(), inputSatoshis)
    });

    it('should return true', () => {
        expect(util.testPreimageParsing(new Bytes(toHex(preimage))).verify({ tx, inputIndex, inputSatoshis })).to.equal(true);
    });
});