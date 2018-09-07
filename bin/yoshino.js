#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));
const {hasBackup} = require('../utils/hasBackup');
const consola = require('consola');
const chalk = require('chalk');
const scripts = chalk.green('yoshino init');

program
  .usage(`\r\n  ${package.description}\r\n  GithubID: ${package.author}\r\n  Repository: ${package.repository.url}`)
  .option('-o, --output <value>', 'output dirname')
  .option('-t, --theme <value>', 'theme name')
  .option('-ts, --typescript', 'typescript')
  .version(package.version)

program
  .command('init')
  .action(() => {
    require(path.resolve(__dirname, '../scripts/clone.js'))();
  })

program
  .command('update')
  .action(() => {
    require(path.resolve(__dirname, '../scripts/update.js'))();
  })

program
  .command('new <component>')
  .action((component) => {
    if (!hasBackup()) {
      consola.error(`yoshino-cli is not initialized!Please first use ${scripts} to init`);
      return;
    }
    const output = path.resolve(process.cwd(), program.output || './components');
    const ts = program.typescript;
    if (ts) {
      process.env.YOSHINO_CLI_FORMAT = 'tsx';
    } else {
      process.env.YOSHINO_CLI_FORMAT = 'js';
    }
    require(path.resolve(__dirname, '../scripts/new.js'))(component, output);
  })

  program
  .command('all')
  .action(() => {
    if (!hasBackup()) {
      consola.error(`yoshino-cli is not initialized!Please first use ${scripts} to init`);
      return;
    }
    const output = path.resolve(process.cwd(), program.output || './components');
    const theme = program.theme;
    const ts = program.typescript;
    if (ts) {
      process.env.YOSHINO_CLI_FORMAT = 'tsx';
    } else {
      process.env.YOSHINO_CLI_FORMAT = 'js';
    }
    require(path.resolve(__dirname, '../scripts/all.js'))(output, theme);
  })

program.parse(process.argv);