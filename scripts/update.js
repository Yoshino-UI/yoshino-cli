
// update yoshino backup
const os = require('os');
const path = require('path');
const {execSync} = require('child_process');
const {existsSync} = require('fs');
const clone = require('./clone');
const consola = require('consola');

module.exports = () =>{
  const platform = os.platform();
  const backup = path.resolve(__dirname, '../yoshino');

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

  if (existsSync(backup)) {
    try {
      execSync(cmd);
    } catch (error) {
      consola.error(error);
      return;
    }
  }

  clone();
}
