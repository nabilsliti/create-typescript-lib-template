create-typescript-lib-template
==============

A tool based on plop.js that makes creating a TypeScript library extremely easy.

### Installation

Install `create-typescript-lib-template` globally
```
$ npm install -g create-typescript-lib-template
```

### CLI Usage
Once `create-typescript-lib-template` is installed, you are ready to run ``tslib`` from the terminal.

##### Usage:
```bash
$ tslib          // Create a typescript library template
```
This command will ask you some questions to generate your TypeScript library
- `library name:` _enter the library name_
- `Where would you like to create this library ?` _choose where you want to create the library_
- `version: (1.0.0)` _enter the version (default = 1.0.0)_
- `description:` _enter the description_
- `entry point: (index.ts)` _enter entry point file (default = index.ts)_
- `git repository:` _enter the git repository_
- `keywords:` _enter the keywords (use `,` for separating keywords)_
- `author:` _enter the author_
  
**Congratulations :)**.

**Start coding!** `package.json` and entry files are already set up for you, so don't worry about linking to your main file, typings, etc. Just keep those files with the same name.

### Features

 - **Zero-setup**. After running `npm install` things will setup for you :wink:
 - **[RollupJS](https://rollupjs.org/)** for multiple optimized bundles following the [standard convention](http://2ality.com/2017/04/setting-up-multi-platform-packages.html) and [Tree-shaking](https://alexjoverm.github.io/2017/03/06/Tree-shaking-with-Webpack-2-TypeScript-and-Babel/)
 - **Tests**, coverage and interactive watch mode using [Jest](http://facebook.github.io/jest/)
- **[TSLint](https://palantir.github.io/tslint/)** for code formatting and consistency
 - **[TypeDoc](http://typedoc.org/)** to generate documentation
 - **Automatic types `(*.d.ts)`** file generation
 - **[husky](https://github.com/typicode/husky)** is installed and configured for the git hooks (pre-commit and pre-push).
 - **Generate a changelog** from git metadata
 - **Automatic releases** (major, minor and patch version). Just run `npm run release`
 - **Git is initialized automatically** with `main` branch



### CLI Options:

```bash
$ tslib -h, --help        // Show the help
$ tslib -v, --version     // Display current version
$ tslib --cwd             // Directory from which relative paths are calculated against
```

### Examples:

```bash
$ tslib     // Create a typescript library template in the current working directory
$ tslib --cwd /path/where/you/will/create/your/library    // Create a typescript library template in --cwd path (/path/where/you/will/create/your/library)
```

### License

Licensed under [MIT](./LICENSE).
