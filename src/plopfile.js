const directory = require('inquirer-directory');
const shell = require('shelljs');

const args = process.argv.slice(2);
const argv = require('minimist')(args);

const cwd = argv.cwd || process.cwd();

function getEnryPoint(entryPoint, isSpec = false) {
    const suffix = isSpec ? '.spec' : '';
    return Boolean(entryPoint) ? `${ entryPoint.split('.ts')[ 0 ] }${ suffix }` : `index${ suffix }`;
}

function createTsLib({
    name,
    version,
    entryPoint,
    gitRepository,
}) {
    const libName = name.trim();
    const actions = [];

    // husky files
    actions.push(
        {
            type: 'addMany',
            destination: `${ cwd }/${ libName }`,
            templateFiles: './templates/.husky/**/*',
        },
        () => libName,
    );

    // github workflow files
    actions.push({
        type: 'addMany',
        destination: `${ cwd }/${ libName }`,
        templateFiles: './templates/.github/**/*',
        data: {
            tagName: '{{ steps.tag.outputs.tag }}',
            githubToken: '{{ secrets.TOKEN_GITHUB }}',
            uploadUrl: '{{ steps.create_release.outputs.upload_url }}',
            npmToken: '{{ secrets.NPM_AUTH_TOKEN }}',
        },
    });

    // entry point file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/src/${ getEnryPoint(entryPoint) }.ts`,
    });

    // spec file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/test/${ getEnryPoint(entryPoint, true) }.ts`,
        templateFile: require.resolve('./templates/lib.spec.ts.hbs'),
    });

    // .editorconfig file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/.editorconfig`,
        templateFile: require.resolve('./templates/.editorconfig.hbs'),
    });

    // .eslintignore file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/.eslintignore`,
        templateFile: require.resolve('./templates/.eslintignore.hbs'),
    });

    // .eslintrc file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/.eslintrc`,
        templateFile: require.resolve('./templates/.eslintrc.hbs'),
    });

    // Lisence file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/LICENSE`,
        templateFile: require.resolve('./templates/LICENSE.hbs'),
    });

    // package.json file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/package.json`,
        templateFile: require.resolve('./templates/package.json.hbs'),
        data: {
            homePage: gitRepository.replace('.git', '#readme'),
            version: version ?? '1.0.0',
            outputFile: getEnryPoint(entryPoint),
        },
    });

    // readme file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/README.md`,
        templateFile: require.resolve('./templates/README.md.hbs'),
    });

    // rollup.config file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/rollup.config.ts`,
        templateFile: require.resolve('./templates/rollup.config.ts.hbs'),
        data: {
            outputFile: getEnryPoint(entryPoint),
        },
    });

    // readme file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/tsconfig.json`,
        templateFile: require.resolve('./templates/tsconfig.json.hbs'),
    });

    // release file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/release.js`,
        templateFile: require.resolve('./templates/release.js.hbs'),
    });

    // .gitignore file
    actions.push({
        type: 'add',
        path: `${ cwd }/${ libName }/.gitignore`,
        templateFile: require.resolve('./templates/.gitignore.hbs'),
    }, () => {
        shell.exec('git init -q --initial-branch=main', { cwd: `${ cwd }/${ libName }` });
    });

    return actions;
}

module.exports = function initTslib(tslib) {
    tslib.addPrompt('directory', directory);
    tslib.setGenerator('create-ts-lib', {
        description: 'Create typescript library',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'library name:',
                validate: (value) => (!Boolean(value.trim()) ? 'Library name is required.' : true),
            },
            {
                type: 'directory',
                name: 'path',
                message: 'where would you like to create this library ?',
                basePath: cwd,
            },
            {
                type: 'input',
                name: 'version',
                message: 'version:',
                default: '1.0.0',
            },
            {
                type: 'input',
                name: 'description',
                message: 'description:',
            },
            {
                type: 'input',
                name: 'entryPoint',
                message: 'entry point:',
                default: 'index.ts',
            },
            {
                type: 'input',
                name: 'gitRepository',
                message: 'git repository:',
            },
            {
                type: 'input',
                name: 'keywords',
                message: 'keywords:',
            },
            {
                type: 'input',
                name: 'author',
                message: 'author:',
            },
        ],
        actions: createTsLib,
    });
};
