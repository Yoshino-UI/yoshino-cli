// git clone yoshino
const {execSync} = require('child_process');
const path = require('path');
const consola = require('consola');
const showProcess = require('../utils/showProcess');
const {existsSync} = require('fs');
const chalk = require('chalk');


const targetDir  = path.resolve(__dirname, '../yoshino');
const yoshinoRep = 'https://github.com/Yoshino-UI/Yoshino.git';

module.exports = () =>{
  if (existsSync(targetDir)) {
    const scripts = chalk.green('yoshino update');
    consola.error(`You have cloned!Please use ${scripts} to update backup!`);
    return;
  }

  showProcess.start('starting clone yoshino rep from github........');

  try {
    execSync(`git clone ${yoshinoRep} ${targetDir}`);
  } catch (error) {
    showProcess.error(error);
    return;
  }

  showProcess.end(`init success`);
}