const fse = require('fs-extra');
const fs = require('fs');
const path = require('path');
const {backup} = require('../utils/hasBackup');
const {getAllComponents, newComponent} = require('../utils/component');
const showProcess = require('../utils/showProcess');
const consola = require('consola');
const {downloadTheme} = require('../utils/themes');

module.exports = async (output, theme) => {
  if (theme) {
    const res = await downloadTheme(theme);
    if (!res) {
      return;
    }
  }
  const themeBackup = theme ? path.resolve(__dirname, `../themes/${theme}`) : undefined;
  const allComponents = getAllComponents(themeBackup);
  const backupStyleDir =  path.resolve(themeBackup || backup, `./components/styles`);
  const outputStyleDir = path.resolve(output, './styles');

  showProcess.start('starting output all components........');
  // 创建styles 目录
  // 组件公用style目录是否存在
  if (!fs.existsSync(outputStyleDir)) {
    fse.copySync(backupStyleDir, outputStyleDir);
  }
  
  let newCount = 0;
  for (const component of allComponents) {
    if (newComponent(component, output, themeBackup || backup)) {
      newCount++;
    };
  }
  showProcess.end(`Ending output ${newCount} components`);
}