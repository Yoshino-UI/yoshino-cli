
// update yoshino backup
const os = require('os');
const path = require('path');
const {execSync} = require('child_process');
const {hasBackup, backup} = require('../utils/hasBackup');
const clone = require('./clone');
const consola = require('consola');

module.exports = () =>{
  const platform = os.platform();

  // delete dir
  const commandMap = {
    'win32': `rd /s /q ${backup}`,
    'linux': `rm -rm ${backup}`
  };
  
  const cmd = commandMap[platform];
  if (!cmd) {
    consola.error(`your system is not win32 or linux?`)
    return;
  }

  if (hasBackup()) {
    try {
      execSync(cmd);
    } catch (error) {
      consola.error(error);
      return;
    }
  }

  clone();
}
