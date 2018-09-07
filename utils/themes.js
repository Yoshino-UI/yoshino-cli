const superagent = require('superagent');
const consola = require('consola');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');
const showProcess = require('../utils/showProcess');
const themesBackup = path.resolve(__dirname, '../themes');

const getJSON = async (url) => {
  return new Promise((resolve) => {
    superagent
    .get(url)
    .end((err,pres) => {
      resolve(pres.text);
    });
  })
}

const getThemes = async () => {
  const themesUrl = 'https://raw.githubusercontent.com/Yoshino-UI/Yoshino/master/docs/pages/themes/themes.ts';
  const themesStr = await getJSON(themesUrl);
  const themesArr = eval(themesStr.replace('export default ', '').replace(';', ''));
  return themesArr;
}

const getThemeMsg = async (name) => {
  const themes = await getThemes();
  for (const theme of themes) {
    if (theme.name === name) {
      return theme;
    }
  }
  return false;
}

const downloadTheme = async (name) => {
  const themeName = chalk.green(name);
  const theme = await getThemeMsg(name);
  const themeSite = chalk.yellow('https://yoshino-ui.github.io/#/docs/theme');

  if (!theme) {
    consola.error(`theme ${themeName} does not existed!`)
    consola.info(`More themes refer to ${themeSite}`);
    return false;
  }

  const themeBackup = path.resolve(themesBackup, theme.name);
  
  if (fs.existsSync(themeBackup)) {
    return true;
  }

  showProcess.start(`starting clone thme ${themeName} rep from github........`);

  try {
    execSync(`git clone ${theme.rep} ${themeBackup}`);
  } catch (error) {
    showProcess.error(error);
    return false;
  }

  showProcess.end(`download theme success`);

  return true;
}

module.exports = {
  getThemes,
  getThemeMsg,
  downloadTheme,
};