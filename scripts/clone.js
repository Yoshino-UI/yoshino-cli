// git clone yoshino
const {execSync} = require('child_process');
const path = require('path');


const targetDir  = path.resolve(__dirname, '../yoshino');
const yoshinoRep = 'https://github.com/Yoshino-UI/Yoshino.git';

module.exports = () =>{
  execSync(`git clone ${yoshinoRep} ${targetDir}`);
}