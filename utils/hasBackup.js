const {existsSync} = require('fs');
const path = require('path');
const backup = path.resolve(__dirname, '../yoshino');

const hasBackup = () =>  existsSync(backup);
module.exports = {
  hasBackup,
  backup,
}