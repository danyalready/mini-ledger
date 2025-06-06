import Block from './Block';

export default class Blockchain {
    chain: Block[];
    difficulty: number = 3;

    constructor() {
        // Add Genesis Block
        this.chain = [new Block(0, Date.now(), [])];
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock: Block) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
            const currBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (
                currBlock.hash !== currBlock.calculateHash() ||
                currBlock.prevHash !== prevBlock.hash ||
                !currBlock.hash.startsWith('0'.repeat(this.difficulty))
            ) {
                return false;
            }
        }

        return true;
    }
}
