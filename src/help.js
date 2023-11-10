const chalk = require('chalk');
const boxen = require('boxen');
const version = require('./version');

module.exports = function help() {
    console.log([
        chalk.keyword('violet')(boxen(
            chalk.red('TSLIB: Create a typescript library template'),
            { padding: 1, borderColor: 'red', dimBorder: true },
        )),
        `${ chalk.bold('Version:') } ${ version }`,
        chalk.bold('Usage:'),
        `  $ tslib                 ${ chalk.dim('Create a typescript library template') }`,
        chalk.bold('Options:'),
        `  -h, --help             ${ chalk.dim('Show this help') }`,
        `  -v, --version          ${ chalk.dim('Display current version') }`,
        `  --cwd                  ${ chalk.dim('Directory from which relative paths are calculated against') }`,
    ].join('\n'));
};
