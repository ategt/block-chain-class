const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(timestamp, data, previousHash = "") {
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        const hash = SHA256(
            this.previousHash +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce
        );

        return hash.toString();
    }

    mineBlock(difficulty) {
        const hashPreamble = Array(difficulty + 1).join("0");

        while (this.hash.substring(0, difficulty) !== hashPreamble) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        return this.hash;
    }
}

class Blockchain {
    constructor() {
        const genesisBlock = this.createGenesisBlock();

        this.chain = [];

        this.chain.push(genesisBlock);

        this.difficulty = 3;
    }

    createGenesisBlock() {
        return new Block("01/01/2017", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        const hx = newBlock.mineBlock(this.difficulty);
        console.log(`Mine Hash: ${hx}`);
        newBlock.hash = newBlock.calculateHash();
        console.log(`Block Hash: ${newBlock.hash}`);

        this.chain.push(newBlock);
    }

    _isCompareBlocks(previousBlock, currentBlock) {
        return (currentBlock.hash === currentBlock.calculateHash() &&
                (currentBlock.previousHash === previousBlock.hash));
    }

    _isBlockSequenceValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!this._isCompareBlocks(previousBlock, currentBlock)) {
                return false;
            }
        }

        return true;
    }

    _isGenesisBlockValid() {
        return JSON.stringify(this.createGenesisBlock()) === JSON.stringify(this.chain[0]);
    }

    isChainValid() {
        return this._isGenesisBlockValid() && this._isBlockSequenceValid();
    }
}

module.exports = { Block, Blockchain };