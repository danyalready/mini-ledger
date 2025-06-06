import * as crypto from 'crypto';

export interface TransactionData {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    signature?: string;
}

export default class Transaction implements TransactionData {
    fromAddress: string | null;
    toAddress: string;
    amount: number;
    signature?: string;

    constructor(fromAddress: string | null, toAddress: string, amount: number) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash(): string {
        return crypto
            .createHash('sha256')
            .update(this.fromAddress + this.toAddress + this.amount)
            .digest('hex');
    }

    signTransaction(privateKey: crypto.KeyObject, publicKey: string) {
        if (this.fromAddress !== publicKey) {
            throw new Error('You cannot sign transactions for other wallets!');
        }

        const hash = this.calculateHash();
        const sign = crypto.createSign('SHA256');
        sign.update(hash).end();
        this.signature = sign.sign(privateKey, 'hex');
    }

    isValid(): boolean {
        if (this.fromAddress === null) return true; // это награда майнеру

        if (!this.signature) throw new Error('No signature in this transaction');

        const publicKey = crypto.createPublicKey({
            key: this.fromAddress,
            format: 'pem',
        });

        const verify = crypto.createVerify('SHA256');
        verify.update(this.calculateHash()).end();

        return verify.verify(publicKey, this.signature, 'hex');
    }
}
