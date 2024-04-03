// run.js

const { setupCommands } = require('./commands');

function cmd(program) {
    const configuredProgram = setupCommands();
    configuredProgram.parseAsync(process.argv).catch(err => {
        throw err;
    });
}

module.exports = { cmd };
