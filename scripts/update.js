
// update yoshino backup
const fse = require('fs-extra');
const {hasBackup, backup} = require('../utils/hasBackup');
const clone = require('./clone');
const consola = require('consola');

module.exports = () =>{
  if (hasBackup()) {
    try {
      // execSync(cmd);
      fse.removeSync(backup);
    } catch (error) {
      consola.error(error);
      return;
    }
  }

  clone();
}
