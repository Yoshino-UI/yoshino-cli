const consola = require('consola');
const chalk = require('chalk');
require('draftlog').into(console);

let startTime; // startTime

const start = (str) =>{
  startTime =  new Date().getTime();
  consola.start(str);
}

const end = (str) =>{ 
  const end = new Date().getTime();
  const time = chalk.yellow(`${end - startTime}ms`)
  consola.success(`${str} in ${time}`);  
}

const error = (str) => {
  consola.error(str);  
}

module.exports = {
  start,
  end,
  error,
}

