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

	compareBlocks(otherBlock) {
		
	}

	isChainValid(){
		for (let i = 1; i < this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if ((currentBlock.hash !== currentBlock.calculateHash()) ||
				(currentBlock.previousHash !== previousBlock.hash)   ||
				(this.chain[0] !== this.createGenesisBlock())) {

				if (currentBlock.hash !== currentBlock.calculateHash()) {
					console.warn(1);
				}

				if (currentBlock.previousHash !== previousBlock.hash) {
					console.warn(2);
				}

				if (this.chain[0] !== this.createGenesisBlock()) {
					console.warn(3);
					console.warn(this.chain[0]);
					console.warn(this.createGenesisBlock());
					console.warn(JSON.stringify(this.createGenesisBlock()) === JSON.stringify(this.chain[0]));
					console.warn(this.createGenesisBlock() === this.chain[0]);
				}
			
					return false;
			}
		}

		return true;
	}
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports =  { Block, Blockchain };
}