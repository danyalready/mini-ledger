import Block from './Block';
import Transaction, { TransactionData } from './Transaction';

export default class Blockchain {
    chain: Block[];
    pendingTransactions: TransactionData[] = [];
    difficulty: number = 4;
    miningReward: number = 100;

    constructor() {
        // Add Genesis Block
        this.chain = [new Block(0, [])];
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions(rewardAddress: string) {
        const rewardTx = new Transaction(null, rewardAddress, this.miningReward);
        const latestBlock = this.getLatestBlock();

        const block = new Block(latestBlock.index + 1, [...this.pendingTransactions, rewardTx], latestBlock.hash);

        if (!block.hasValidTransactions()) throw new Error('Block contains invalid transactions');

        block.mineBlock(this.difficulty);

        this.chain.push(block);
        this.pendingTransactions = [];
    }

    addTransaction(transaction: TransactionData) {
        if (transaction.amount <= 0) throw new Error('Transaction ammount should be higher than 0');

        this.pendingTransactions.push(transaction);
    }

    getAddressBalance(address: string): number {
        let balance = 0;

        for (const block of this.chain) {
            for (const transaction of block.transactions) {
                if (transaction.fromAddress === address) {
                    balance -= transaction.amount;
                }

                if (transaction.toAddress === address) {
                    balance += transaction.amount;
                }
            }
        }

        return balance;
    }

    isValid(): boolean {
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
