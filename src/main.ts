import Block from './blockchain/Block';
import Blockchain from './blockchain/Blockchain';

const demoChain = new Blockchain();

console.log('🔨 Mining block 1...');
demoChain.addBlock(new Block(1, Date.now(), [{ from: 'Alice', to: 'Bob', amount: 10 }]));

console.log('🔨 Mining block 2...');
demoChain.addBlock(new Block(2, Date.now(), [{ from: 'Bob', to: 'Charlie', amount: 5 }]));

console.log('📦 Blockchain:', JSON.stringify(demoChain, null, 2));
