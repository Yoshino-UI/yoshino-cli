#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')));

program
  .usage(`\r\n  ${package.description}\r\n  GithubID: ${package.author}\r\n  Repository: ${package.repository.url}`)
  .version(package.version)
  .option('-v, --version', 'show version')

program
  .command('clone')
  .action(() => {
    require(path.resolve(__dirname, '../scripts/clone.js'))();
  })

program.parse(process.argv);