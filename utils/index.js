const execa = require('execa');
const { download } = require('./download');
const { red, blue } = require('chalk');
const log = console.log;

async function exec(cmd) {
  try {
    const stdout = await execa.command(cmd);
    return stdout;
  } catch (error) {
    log(red(error));
  }
  
}

async function getGitInfo() {
  return await exec('git config user.name');
}

module.exports = {
  download,
  exec,
  getGitInfo
};