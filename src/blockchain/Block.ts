import * as crypto from 'crypto';

export default class Block<T = any> {
    public hash: string;

    constructor(public index: number, public timestamp: string, public data: T, public prevHash: null | string) {
        this.hash = this.calcHash();
    }

    calcHash(): string {
        const blockData = this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash;

        return crypto.createHash('sha256').update(blockData).digest('hex');
    }
}
