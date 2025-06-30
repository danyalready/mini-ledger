import readline from 'readline';

import Blockchain from './core/Blockchain';
import Block from './core/Block';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const blockchain = new Blockchain();

(function prompt() {
    rl.question('> ', (command) => {
        const [action, ...args] = command.split(' ');

        switch (action) {
            case 'print': {
                console.log(JSON.stringify(blockchain.chain, null, 2));

                break;
            }
            case 'check': {
                console.log(blockchain.isValid() ? '✅ Blockchain is valid.' : '❌ Blockchain is NOT valid.');

                break;
            }
            case 'exit': {
                rl.close();

                return;
            }
            default:
                console.log('Commands: print, check, exit');
        }

        prompt();
    });
})();
