import CryptoJS from 'crypto-js';

export default class Block<T = any> {
    public hash: string;

    constructor(public index: number, public timestamp: string, public data: T, public prevHash: string) {
        this.hash = this.calcHash();
    }

    calcHash(): string {
        const blockData = this.index + this.timestamp + JSON.stringify(this.data) + this.prevHash;

        return CryptoJS.SHA256(blockData).toString();
    }
}
