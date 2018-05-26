#!/usr/bin/env node

const program = require('commander');
const pkg = require('./package.json');
const init = require('./lib/init');

program
  .version(pkg.version)
  .option('-i, --init [path]', 'Init project', init)
  .parse(process.argv);
