import * as crypto from 'crypto';

import Transaction, { type TransactionData } from './Transaction';

interface BlockData {
    index: number;
    timestamp: number;
    transactions: TransactionData[];
    prevHash: string;
    hash: string;
    nonce: number;
}

export default class Block implements BlockData {
    index: number;
    timestamp: number = Date.now();
    transactions: TransactionData[];
    prevHash: string;
    hash: string;
    nonce: number = 0;

    constructor(index: number, transactions: TransactionData[], prevHash: string = '') {
        this.index = index;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        const data = this.index + this.timestamp + JSON.stringify(this.transactions) + this.prevHash + this.nonce;

        return crypto.createHash('sha256').update(data).digest('hex');
    }

    mineBlock(difficulty: number): void {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(`✅ Block mined: ${this.hash}`);
    }

    hasValidTransactions(): boolean {
        for (const transaction of this.transactions) {
            const tx = new Transaction(
                transaction.fromAddress,
                transaction.toAddress,
                transaction.amount,
                transaction.signature
            );

            if (!tx.isValid()) return false;
        }

        return true;
    }
}
