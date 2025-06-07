import * as crypto from 'crypto';

export default class Wallet {
    private privateKey: crypto.KeyObject;
    private publicKey: string;

    constructor() {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'secp256k1' });

        this.privateKey = privateKey;
        this.publicKey = publicKey.export({ type: 'spki', format: 'pem' }).toString();
    }

    getAddress(): string {
        return this.publicKey;
    }

    getPrivateKey(): crypto.KeyObject {
        return this.privateKey;
    }
}
