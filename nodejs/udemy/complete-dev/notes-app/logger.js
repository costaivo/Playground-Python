const chalk = require('chalk');

const error = (message) =>
    console.log(chalk.red.inverse(message))


const success = (message) =>
    console.log(chalk.green.inverse(message))

const info = (message) =>
    console.log(chalk.inverse(message))

const data = (message) =>
    console.log(message)

module.exports = {
    error,
    success,
    info,
    data
}