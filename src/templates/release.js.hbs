const { exec, spawn } = require('child_process');
const fs = require('fs');
const { Select } = require('enquirer');
const chalk = require('chalk');

const prompt = new Select({
    name: 'version-type',
    message: 'Type of version bump',
    choices: [ 'major', 'minor', 'patch' ],
});

function commandExec(cmd, callback, errFn) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${ error }`);
            errFn && errFn(stderr);
            return;
        }
        callback && callback(stdout);
    });
}

function execAsync(cmd) {
    return new Promise((resolve, reject) => {
        commandExec(cmd, resolve, reject);
    });
}

async function bump(type) {
    console.log(`\n👋 ${ chalk.green('Upgrading version') } 👋`);
    console.log(`${ chalk.dim('-----------------------') }`);

    console.log(`⏳ ${ chalk.dim('Sync local branch') } ⏳`);
    await execAsync(`git checkout develop`);
    await execAsync(`git fetch --all`);

    console.log(`⏳ ${ chalk.dim('Sync develop branch') } ⏳`);
    await execAsync(`git pull origin develop`);

    console.log(`⏳ ${ chalk.dim('Sync main branch') } ⏳`);
    await execAsync(`git fetch origin main:main`);

    const updater = spawn('npm', [ 'version', type, '--no-git-tag-version' ], { shell: true });
    await new Promise((resolve) => updater.on('close', resolve));
    await execAsync('npm run changes');
    console.log(`💪 ${ chalk.dim('Generate a changelog') } 💪`);

    const packageFile = fs.readFileSync('./package.json', 'utf-8');
    const newVersion = JSON.parse(packageFile).version;
    console.log(`💪 ${ chalk.dim(`Updating to ${ newVersion }`) } 💪`);

    await execAsync(`git add .`);
    console.log(`💪 ${ chalk.dim('Creating commit') } 💪`);

    await execAsync(`git commit -m "v${ newVersion }"`);
    await execAsync(`git checkout main`);
    console.log(`💪 ${ chalk.dim('Merging develop to main') } 💪`);

    await execAsync(`git merge develop`);
    console.log(`💪 ${ chalk.dim(`Add new tag ${ newVersion }`) } 💪`);

    await execAsync(`git tag ${ newVersion }`);
    console.log(`💪 ${ chalk.dim('Pushing all the stuffs') } 💪`);

    await execAsync(`git push --tags --no-verify`);
    await execAsync(`git push --set-upstream origin main --no-verify`);
    await execAsync(`git checkout develop`);
    await execAsync(`git push origin develop --no-verify`);
    console.log(`${ chalk.dim('-------------------------') }`);
    console.log(`🚀 ${ chalk.green(`Enjoy version ${ newVersion }`) } 🚀\n`);
}

prompt.run()
    .then(bump)
    .catch(console.error);
