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

blockchain.addTransaction(tx1);
blockchain.addTransaction(tx2);
blockchain.addTransaction(tx3);

blockchain.minePendingTransactions(myWallet.getAddress());

console.log(JSON.stringify(blockchain, null, 2));
console.log(blockchain.isValid());
