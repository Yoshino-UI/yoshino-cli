// 获取组件依赖
const dependences = require('../dependences/dependences');

module.exports = (component) => {
  for (const item of dependences) {
    // 依赖命中
    if (component === item.parent) {
      return item.children;
    }
  }
  return false;
}