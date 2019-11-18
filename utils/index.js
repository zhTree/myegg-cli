const execa = require('execa');
const { download } = require('./download');
const { red, blue } = require('chalk');
const log = console.log;
const path = require('path');
const fs = require('fs');

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

function checkInNpmProject() {
  const cwd = process.cwd();
  const packageJson = path.resolve(cwd, 'package.json');
  return fs.existsSync(packageJson);
}

function checkHasFolder(folder) {
  const cwd = process.cwd();
  const folderPath = path.resolve(cwd, 'app', folder);
  return fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory();
}

function checkHasFile(folder, file) {
  const cwd = process.cwd();
  const filePath = path.resolve(cwd, 'app', folder, `${file}.js`);
  return fs.existsSync(filePath);
}

module.exports = {
  download,
  exec,
  getGitInfo,
  checkInNpmProject,
  checkHasFolder,
  checkHasFile
};