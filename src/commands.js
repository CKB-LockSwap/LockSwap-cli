// commands.js

const { program } = require("commander");
const SearchOrder = require('./SearchOrder');
const TakeOrder = require('./TakeOrder');
const MakeOrder = require('./MakeOrder');
const GenerateAccount = require('./GenerateAccount');
const GetBalance = require('./GetBalance');

function setupCommands() {
    program
        .version('1.0.0')
        .description('A CLI program for LockSwap')
        .command('SearchOrder')
        .description('Execute  search order')
        .action(() => {
            const searchOrder = new SearchOrder();
            searchOrder.execute();
        });

    program
        .command('TakeOrder')
        .description('Execute TakeOrder')
        .action(() => {
            const takeOrder = new TakeOrder();
            takeOrder.execute();
        });

    
    program
        .command('MakeOrder')
        .description('Execute MakeOrder')
        .action(() => {
            const makeOrder = new MakeOrder();
            makeOrder.execute();
        });

    program
        .command('Generate')
        .description('Generate Account')
        .action(() => {
            const generateAccount = new GenerateAccount();
            generateAccount.execute();
        });  
        
    program
        .command('GetBalance')
        .description('GetBalance')
        .action((type) => {
            const getBalance = new GetBalance();
            if (type === 'CKB') {
                getBalance.getCKBBalance();
            } else if (type === 'Token') {
                getBalance.execute();
            } else {
                console.error("Invalid type. Please specify either 'CKB' or 'Token'.");
            }
        });    

    return program;
}

// 导出设置好的命令
module.exports = { setupCommands };
