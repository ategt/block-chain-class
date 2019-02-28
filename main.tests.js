const test = require('tape');

const main = require('./main');
const Blockchain = require('./main');
const Block = require('./main');

const beforeEach = require('tape');
const afterEach = require('tape');

beforeEach('this will happen before each test', (assert) => {
	// Setup items go here.
	assert.end();
})

afterEach('this will happen after each test', (assert) => {
	// Teardown items go here.
	assert.end();
})

const wait = (ms) => new Promise((r, j) => setTimeout(r, ms))

test('The first test', async (assert) => {
	const Block = main.Block;
	const Blockchain = main.Blockchain;
	
	const blockchain = new Blockchain();

	const firstBlock = new Block('12:00', "Hello");
	const secondBlock = new Block('1:00', "Bye");

	assert.equal(firstBlock.hash, "6a9717fe524fad204746b6ea8353581ed1a1be893434ad8a54cfaadbdab66969");
	assert.equal(secondBlock.hash, "c8e4ebb22e23598a7a4d8ae31a2e56ff82ce4eb1d6724c1293f83c9adffd0ad5");

	assert.equal(JSON.stringify(blockchain), '{"chain":[{"previousHash":"0","timestamp":"01/01/2017","data":"Genesis block","hash":"67445b2ce9ccaa2704e67f0f16c1f86353932e5cadfd68c820e1162ce46fc42d"}]}');

	// await wait(500)

	// assert.ok()

	assert.end();
})
