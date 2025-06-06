import Block from './classes/block';

const block = new Block(0, new Date().toISOString(), 'Alice -> Bob', '');

console.log(block.hash);
