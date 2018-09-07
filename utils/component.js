const {backup} = require('./hasBackup');
const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');
const consola = require('consola');

// 获取所有组件名
const getAllComponents = (themesBackup) => {
  const files = fs.readdirSync(path.resolve(themesBackup || backup, './components'));
  const notComponents = ['template', 'styles', 'utils', 'index.tsx', 'tsconfig.json'];
  const components = new Set(files);
  for (const item of notComponents) {
    components.delete(item);
  }
  return Array.from(components);
}

// 是否有该组件
const hasComponent = (component) => {
  return getAllComponents().indexOf(component) !== -1;
}


// 创建单个组件，不解析依赖树
const newComponent = (component, output) => {
  const backupComponentDir = path.resolve(backup, `./components/${component}`);
  const backupComponentStyleDir =  path.resolve(backupComponentDir, `./style`);
  const outputComponentDir = path.resolve(output, component);
  const outputComponentStyleDir = path.resolve(outputComponentDir, './style');

  if (fs.existsSync(outputComponentDir)) {
    consola.error(`component ${component} has existed!`);
    return false;
  }

  // 创建组件
  fs.mkdirSync(outputComponentDir);
  fse.copySync(backupComponentStyleDir, outputComponentStyleDir);

  const template = `import './style/index.less';
import ${component} from 'yoshino/lib/${component}';
export default ${component}`;
  fs.writeFileSync(path.resolve(outputComponentDir, `./index.${process.env.YOSHINO_CLI_FORMAT}`), template);

  consola.success(`component ${component} has been successfully created!`);
  return true;
}

module.exports = {
  getAllComponents,
  hasComponent,
  newComponent,
}