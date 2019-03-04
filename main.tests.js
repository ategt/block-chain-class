const test = require("tape");

const { Blockchain, Block } = require("./main");

test("The hashes should match Pat's hashes.", (assert) => {
    const firstBlock = new Block("12:00", "Hello");
    const secondBlock = new Block("1:00", "Bye");

    assert.equal(firstBlock.hash, "6a9717fe524fad204746b6ea8353581ed1a1be893434ad8a54cfaadbdab66969");
    assert.equal(secondBlock.hash, "c8e4ebb22e23598a7a4d8ae31a2e56ff82ce4eb1d6724c1293f83c9adffd0ad5");

    assert.end();
});

test("The chain structure should match the example output.", (assert) => {
    const blockchain = new Blockchain();

    assert.equal(JSON.stringify(blockchain), '{"chain":[{"previousHash":"0","timestamp":"01/01/2017","data":"Genesis block","hash":"67445b2ce9ccaa2704e67f0f16c1f86353932e5cadfd68c820e1162ce46fc42d"}]}');

    assert.end();
});


test("The blockchain should initialize with one block, matching the provided hash, which getLatestBlock should return.", (assert) => {
    const blockchain = new Blockchain();

    assert.equal(blockchain.getLatestBlock().hash, "67445b2ce9ccaa2704e67f0f16c1f86353932e5cadfd68c820e1162ce46fc42d");

    assert.end();
});

test("The block chain should accept new blocks, give the appropriate last block, and self validate as valid.", (assert) => {
    const blockchain = new Blockchain();

    const firstBlock = new Block("12:00", "Hello");
    const secondBlock = new Block("1:00", "Bye");

    blockchain.addBlock(firstBlock);
    blockchain.addBlock(secondBlock);

    assert.equal(blockchain.getLatestBlock().hash, "fd6cd59f857dec12012a0c50d5c830b9122fd5598c520e3f3d9b6fbf660521e2");
    assert.equal(blockchain.isChainValid(), true);

    assert.end();
});

test("The block chain should fail to self validate if any of the blocks are tampered with.", (assert) => {
    const blockchain = new Blockchain();

    blockchain.addBlock(new Block("12:00", "Hello"));
    blockchain.addBlock(new Block("1:00", "Bye"));

    blockchain.chain[1].data = "bonjour";

    assert.equal(blockchain.isChainValid(), false);

    assert.end();
});

test("The block chain should fail to self validate if any of the hashes are tampered with.", (assert) => {
    const blockchain = new Blockchain();

    blockchain.addBlock(new Block("12:00", "Hello"));
    blockchain.addBlock(new Block("1:00", "Bye"));

    blockchain.chain[1].data = "bonjour";
    blockchain.chain[1].hash = blockchain.chain[1].calculateHash();

    assert.equal(blockchain.isChainValid(), false);

    assert.end();
});