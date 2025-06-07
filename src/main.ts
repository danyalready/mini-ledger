import Block from './core/Block';
import Blockchain from './core/Blockchain';
import Transaction from './core/Transaction';
import Wallet from './core/Wallet';

const blockchain = new Blockchain();
const myWallet = new Wallet();
const recipientWallet = new Wallet();

const tx1 = new Transaction(myWallet.getAddress(), recipientWallet.getAddress(), 100);
tx1.signTransaction(myWallet.getPrivateKey(), myWallet.getAddress());
const tx2 = new Transaction(myWallet.getAddress(), recipientWallet.getAddress(), 200);
tx2.signTransaction(myWallet.getPrivateKey(), myWallet.getAddress());
const tx3 = new Transaction(myWallet.getAddress(), recipientWallet.getAddress(), 500);
tx3.signTransaction(myWallet.getPrivateKey(), myWallet.getAddress());

blockchain.addBlock(new Block(1, [tx1, tx2, tx3]));
blockchain.addBlock(new Block(2, [tx1, tx2, tx3]));
blockchain.addBlock(new Block(3, [tx1, tx2, tx3]));

console.log(JSON.stringify(blockchain, null, 2));
console.log(blockchain.isChainValid());
