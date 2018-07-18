const hasComponent = require('../utils/hasComponent');
const consola = require('consola');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const {backup} = require('../utils/hasBackup');
const hasDependences = require('../utils/hasDependences');

// 依赖解析
const parseDependense = (component, output) => {
  const backupComponentDir = path.resolve(backup, `./components/${component}`);
  const backupComponentStyleDir =  path.resolve(backupComponentDir, `./style`);
  const outputComponentDir = path.resolve(output, component);
  const outputComponentStyleDir = path.resolve(outputComponentDir, './style');
  

  if (fs.existsSync(outputComponentDir)) {
    return;
  }

  // 依赖后代
  const childrens = hasDependences(component);
  // 组件是否命中依赖树
  if (childrens) {
    // 递归解析
    for (const children of childrens) {
      parseDependense(children, output);
    }
  }

  fs.mkdirSync(outputComponentDir);
  fse.copySync(backupComponentStyleDir, outputComponentStyleDir);

  const template = `import './style/index.less';
import ${component} from 'yoshino/lib/${component}';
export default ${component}`;
  fs.writeFileSync(path.resolve(outputComponentDir, './index.tsx'), template);

  consola.success(`component ${component} has been successfully created!`)
}


// 创建新组件
const newScript = (component, output) => {
  const backupComponentDir = path.resolve(backup, `./components/${component}`);
  const backupComponentStyleDir =  path.resolve(backupComponentDir, `./style`);
  const backupStyleDir =  path.resolve(backup, `./components/styles`);
  const outputComponentDir = path.resolve(output, component);
  const outputComponentStyleDir = path.resolve(outputComponentDir, './style');
  const outputStyleDir = path.resolve(output, './styles');
  
  //  组件名存在
  if (hasComponent(component)) {
    // 组件输出目录是否存在
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    // 输出目录存在此组件
    if (fs.existsSync(outputComponentDir)) {
      consola.error(`component ${component} has existed!`);
      return;
    }

    // 组件公用style目录是否存在
    if (!fs.existsSync(outputStyleDir)) {
      fse.copySync(backupStyleDir, outputStyleDir);
    }

    // 组件是否命中依赖树
    if (hasDependences(component)) {
      consola.start(`component has other dependences! start parsing!`);

      // 解析依赖，生成对应的组件
      parseDependense(component, output);

      consola.info(`parsing end!`);
    } else {
      // 没命中则只创建一个
      fs.mkdirSync(outputComponentDir);
      fse.copySync(backupComponentStyleDir, outputComponentStyleDir);

      const template = `import './style/index.less';
import ${component} from 'yoshino/lib/${component}';
export default ${component}`;
      fs.writeFileSync(path.resolve(outputComponentDir, './index.tsx'), template);

      consola.success(`component ${component} has been successfully created!`)
    }
  } else {
    consola.error(`component ${component} does not exist!`);
  }
}

module.exports = newScript;