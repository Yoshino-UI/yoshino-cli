#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

program
  .usage(`\r\n  ${package.description}\r\n  GithubID: ${package.author}\r\n  Repository: ${package.repository.url}`)
  .option('-o, --output <value>', 'output dirname')
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
    const output = path.resolve(process.cwd(), program.output || './components');
    require(path.resolve(__dirname, '../scripts/new.js'))(component, output);
  })

program.parse(process.argv);