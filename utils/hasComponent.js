const {backup} = require('./hasBackup');
const fs = require('fs');
const path = require('path');

module.exports = (component) => {
  const files = fs.readdirSync(path.resolve(backup, './components'));
  const notComponents = new Set(['template', 'styles', 'utils', 'index.tsx']);
  const components = new Set(files);
  for (const file of files) {
    if (notComponents.has(file)) {
      components.delete(file);
    }
  }
  return components.has(component);
}