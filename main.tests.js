const test = require("tape");

const { Blockchain, Block } = require("./main");

test("The hashes should calculate consistantly.", (assert) => {
    const firstBlock = new Block("12:00", "Hello");
    const secondBlock = new Block("1:00", "Bye");

    assert.equal(firstBlock.hash, "1592b3883fa8871cbc940ea62a9788892a9b766e7e4da508491c690d232100b8");
    assert.equal(secondBlock.hash, "4552f1127f67aa1def519a233a35443fa24f441c5ae9f554b7f272bc2ba260af");

    assert.end();
});

test("The hashes should match Pat's hashes.", (assert) => {
    const firstBlock = new Block("12:00", "Hello");
    const secondBlock = new Block("1:00", "Bye");

    firstBlock.nonce = "";
    firstBlock.hash = firstBlock.calculateHash();

    secondBlock.nonce = "";
    secondBlock.hash = secondBlock.calculateHash();

    assert.equal(firstBlock.hash, "6a9717fe524fad204746b6ea8353581ed1a1be893434ad8a54cfaadbdab66969");
    assert.equal(secondBlock.hash, "c8e4ebb22e23598a7a4d8ae31a2e56ff82ce4eb1d6724c1293f83c9adffd0ad5");

    assert.end();
});

test("The chain structure should match the example output.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 0;

    assert.equal(JSON.stringify(blockchain), '{"chain":[{"previousHash":"0","timestamp":"01/01/2017","data":"Genesis block","hash":"2fce63c19c9e4f7862a2bf4ccbdb82dc7918e5b8eab9cf6166484063d105c443","nonce":0}],"difficulty":0}');

    assert.end();
});


test("The blockchain should initialize with one block, matching the provided hash, which getLatestBlock should return.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 0;

    assert.equal(blockchain.getLatestBlock().hash, "2fce63c19c9e4f7862a2bf4ccbdb82dc7918e5b8eab9cf6166484063d105c443");

    assert.end();
});

test("The blockchain, havong difficulty of 1, should initialize with one block, matching the provided hash, which getLatestBlock should return.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 1;

    assert.equal(blockchain.getLatestBlock().hash, "2fce63c19c9e4f7862a2bf4ccbdb82dc7918e5b8eab9cf6166484063d105c443");

    assert.end();
});

test("The block chain should accept new blocks, give the appropriate last block, and self validate as valid.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 1;

    const firstBlock = new Block("12:00", "Hello");
    const secondBlock = new Block("1:00", "Bye");

    blockchain.addBlock(firstBlock);

    assert.equal(blockchain.getLatestBlock().hash, "04fcfbbab2764fe7f1743533bd3db6fa9a7cf9cbe34e6546908bd5496fbea874");
    assert.equal(blockchain.isChainValid(), true);

    blockchain.addBlock(secondBlock);

    assert.equal(blockchain.getLatestBlock().hash, "09e1f8c321c9d11d81fb77c0c98fb269f401dd526a48e690c2b959cd14e588d4");
    assert.equal(blockchain.isChainValid(), true);

    assert.end();
});

test("The block chain should fail to self validate if any of the blocks are tampered with.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 0;

    blockchain.addBlock(new Block("12:00", "Hello"));
    blockchain.addBlock(new Block("1:00", "Bye"));

    blockchain.chain[1].data = "bonjour";

    assert.equal(blockchain.isChainValid(), false);

    assert.end();
});

test("The block chain should fail to self validate if any of the hashes are tampered with.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 0;

    blockchain.addBlock(new Block("12:00", "Hello"));
    blockchain.addBlock(new Block("1:00", "Bye"));

    blockchain.chain[1].data = "bonjour";
    blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

    assert.equal(blockchain.isChainValid(), false);

    assert.end();
});

test("The block chain mining test.", (assert) => {
    const blockchain = new Blockchain();

    assert.equal(blockchain.difficulty, 3);

    blockchain.addBlock(new Block("12:00", "Hello"));
    assert.equal(blockchain.getLatestBlock().hash.substring(0, 3), "000");

    blockchain.addBlock(new Block("1:00", "Bye"));
    assert.equal(blockchain.getLatestBlock().hash.substring(0, 3), "000");

    assert.end();
});

test("The block chain harder mining test.", (assert) => {
    const blockchain = new Blockchain();
    blockchain.difficulty = 4;

    assert.equal(blockchain.difficulty, 4);

    blockchain.addBlock(new Block("12:00", "Hello"));

    assert.equal(blockchain.getLatestBlock().hash.substring(0, 4), "0000");

    blockchain.addBlock(new Block("1:00", "Bye"));

    assert.equal(blockchain.getLatestBlock().hash.substring(0, 4), "0000");

    assert.end();
});