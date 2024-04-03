const { setupCommands } = require('./commands');

async function cmd() {
    const program = setupCommands();
    try {
        await program.parseAsync(process.argv);
    } catch (err) {
        throw err;
    }
}

module.exports = { cmd };
