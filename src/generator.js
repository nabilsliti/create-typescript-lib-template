const chalk = require('chalk');

module.exports = {
    runPlop(generator) {
        generator.runPrompts()
            .then(generator.runActions)
            .then((result) => {
                if (Boolean(result.failures.length)) {
                    console.log(chalk.red('[FAILED]'), result.failures);
                    process.exit(1);
                } else {
                    console.log(
                        `🚀 🚀 🚀 Enjoy, "${ chalk.bold(result.changes[ 1 ].path) }" was successfully created 🚀 🚀 🚀`,
                    );
                    process.exit(0);
                }
            })
            .catch((err) => {
                console.error(chalk.red('[ERROR]'), err.message);
                process.exit(1);
            });
    },
};
