const { program } = require("commander");
const inquirer = require("inquirer");
const SearchOrder = require('./SearchOrder');
const TakeOrder = require('./TakeOrder');
const MakeOrder = require('./MakeOrder');
const GenerateAccount = require('./GenerateAccount');

function setupCommands() {
    program
        .version('1.0.0')
        .description('A CLI program for LockSwap');

    program
        .command('interactive')
        .description('Run in interactive mode')
        .action(async () => {
            await interactiveMode();
        });

    return program;
}

async function interactiveMode() {
    const choices = [
        { name: 'Search Order', value: 'search' },
        { name: 'Take Order', value: 'take' },
        { name: 'Make Order', value: 'make' },
        { name: 'Generate Account', value: 'generate-account' },
        { name: 'Exit', value: 'exit' }
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: choices
        }
    ]);

    switch (action) {
        case 'search':
            const searchOrder = new SearchOrder();
            await searchOrder.execute();
            break;
        case 'take':
            const { hash } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'hash',
                    message: 'Enter the order cell:'
                }
            ]);
            const takeOrder = new TakeOrder(hash);
            await takeOrder.execute();
            break;
        case 'make':
            const { sudt } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'sudt',
                    message: 'Enter the sudt cell:'
                }
            ]);
            const { price } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'price',
                    message: 'Enter the sell price:'
                }
            ]);
            const makeOrder = new MakeOrder(sudt,price);
            await makeOrder.execute();
            break;
        case 'generate-account':
            const { accountType } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'accountType',
                    message: 'Enter the account type:'
                }
            ]);
            const generateAccount = new GenerateAccount();
            await generateAccount.execute(accountType);
            break;
        case 'exit':
            process.exit();
            break;
        default:
            console.log('Invalid choice');
            break;
    }

    await interactiveMode(); // Continue the loop
}

module.exports = { setupCommands };
