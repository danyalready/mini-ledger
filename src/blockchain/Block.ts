import * as crypto from 'crypto';

import { type TransactionData } from './Transaction';

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
    timestamp: number;
    transactions: any[];
    prevHash: string;
    hash: string;
    nonce: number = 0;

    constructor(index: number, timestamp: number, transactions: any[], prevHash: string = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
    }

    calcHash(): string {
        const data = this.index + this.timestamp + JSON.stringify(this.transactions) + this.prevHash + this.nonce;

        return crypto.createHash('sha256').update(data).digest('hex');
    }

    mineBlock(difficulty: number): void {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.nonce++;
            this.hash = this.calcHash();
        }

        console.log(`✅ Block mined: ${this.hash}`);
    }
}
