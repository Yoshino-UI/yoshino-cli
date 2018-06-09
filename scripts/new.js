const hasComponent = require('../utils/hasComponent');
const consola = require('consola');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {backup} = require('../utils/hasBackup');

module.exports = (component, output) => {
  const backupComponentDir = path.resolve(backup, `./components/${component}`);
  const backupComponentStyleDir =  path.resolve(backupComponentDir, `./style`);
  const backupStyleDir =  path.resolve(backup, `./components/styles`);
  const outputComponentDir = path.resolve(output, component);
  const outputComponentStyleDir = path.resolve(outputComponentDir, './style');
  const outputStyleDir = path.resolve(output, './styles');
  
  if (hasComponent(component)) {
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    if (fs.existsSync(outputComponentDir)) {
      consola.error(new Error(`component ${component} has  existed!`));
      return;
    }

    if (!fs.existsSync(outputStyleDir)) {
      fse.copySync(backupStyleDir, outputStyleDir);
    }

    fs.mkdirSync(outputComponentDir);
    fse.copySync(backupComponentStyleDir, outputComponentStyleDir);

    const template = `import './style/index.less;'
export {${component}} from 'yoshino';`;
    fs.writeFileSync(path.resolve(outputComponentDir, './index.tsx'), template);

    consola.success(`component ${component} has been successfully created!`)
  } else {
    consola.error(new Error(`component ${component} does not exist!`));
  }
}