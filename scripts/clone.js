// git clone yoshino
const {execSync} = require('child_process');
const path = require('path');
const consola = require('consola');
const showProcess = require('../utils/showProcess');
const chalk = require('chalk');
const {hasBackup, backup} = require('../utils/hasBackup');

const yoshinoRep = 'https://github.com/Yoshino-UI/Yoshino.git';

module.exports = () =>{
  if (hasBackup()) {
    const scripts = chalk.green('yoshino update');
    consola.error(`You have cloned!Please use ${scripts} to update backup!`);
    return;
  }

  showProcess.start('starting clone yoshino rep from github........');

  try {
    execSync(`git clone ${yoshinoRep} ${backup}`);
  } catch (error) {
    showProcess.error(error);
    return;
  }

  showProcess.end(`init success`);
}