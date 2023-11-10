#!/usr/bin/env node

const Liftoff = require('liftoff');

const arg = process.argv.slice(2);
const argv = require('minimist')(arg);
const chalk = require('chalk');
const nodePlop = require('node-plop');
const help = require('./help');
const generator = require('./generator');
const version = require('./version');

function run() {
    // Package version
    if (argv.version || argv.v) {
        console.log(chalk.bold(version));
        process.exit(0);
    }

    // Help
    const isHelp = arg.includes('--help') || arg.includes('-h') || (arg[ 0 ] !== '--cwd' && arg.length > 0);
    if (isHelp) {
        help();
        process.exit(0);
    }

    // Plop
    const plopfilePath = require.resolve('./plopfile.js');
    const plop = nodePlop(plopfilePath);

    // Generator
    generator.runPlop(plop.getGenerator('create-ts-lib'));
}

const tslib = new Liftoff({
    name: 'tslib',
    processTitle: 'tslib',
});

tslib.launch({
    cwd: argv.cwd,
}, run);
