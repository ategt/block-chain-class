const SHA256 = require("crypto-js/sha256");

class Block {
	constructor(timestamp, data, previousHash = ''){
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;

		const calculateHash = this.calculateHash.bind(this);

		this.hash = calculateHash();
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
		//return new Block('12:00', "Hello");
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
}

// const blockChain = new Blockchain();

// //console.log(blockChain.createGenesisBlock());

// //const firstBlock = new Block('12:00', "Hello");
// const secondBlock = new Block('1:00', "Bye", firstBlock.hash);

// blockChain.addBlock(secondBlock);

// console.log(firstBlock.hash);
// console.log(secondBlock.hash);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    module.exports =  { Block, Blockchain };
}