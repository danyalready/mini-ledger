import Block from './Block';

export default class Blockchain {
    public chain: Block[];

    constructor() {
        // Create Genesis Block
        this.chain = [new Block(0, new Date().toISOString(), null, null)];
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currBlock.hash !== currBlock.calcHash() || currBlock.prevHash !== prevBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
