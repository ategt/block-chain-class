const SHA256 = require("crypto-js/sha256");

class Block {
	constructor(timestamp, data, previousHash = ''){
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;

		this.hash = this.calculateHash();
	}

	calculateHash(){
		const hash = SHA256(
			this.previousHash + 
			this.timestamp + 
			JSON.stringify(this.data)
		)

		return hash.toString();
	}
}

class Blockchain {
	constructor(){
		const genesisBlock = this.createGenesisBlock();

		this.chain = [];

		this.chain.push(genesisBlock);
	}

	createGenesisBlock() {
		return new Block("01/01/2017", "Genesis block", "0");
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();

		this.chain.push(newBlock);
	}

	_isCompareBlocks(previousBlock, currentBlock) {
		return (currentBlock.hash === currentBlock.calculateHash() &&
				(currentBlock.previousHash === previousBlock.hash));
	}

	_isBlockSequenceValid() {
		for (let i = 1; i < this.chain.length; i++){
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

	isChainValid(){
		return this._isGenesisBlockValid() && this._isBlockSequenceValid();
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports =  { Block, Blockchain };
}