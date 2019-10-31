const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { red } = require('chalk');
const log = console.log;
const sources = require('./source.json');
const { download, exec, getGitInfo } = require('../utils');

async function initProject() {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: '请选择一个模板',
    choices: [
      '示例级别',
      '项目级别 (mysql)',
      '项目级别+ (mysql, redis)',
    ]
  });
  const source = sources[answer.type];
  const tplDir = path.resolve(__dirname,  '../', 'tpl');

  const sourceTarget = path.resolve(tplDir, source);
 
  await download('zhTree/egg-tpl', tplDir);
  
  return sourceTarget;
}

async function customizeProject(projectName, sourceTarget) {
  const { stdout: username } = await getGitInfo();
  const answers = await inquirer.prompt([
    {
      name: 'projectName',
      message: '项目名称',
      default: projectName
    },
    {
      name: 'projectVs',
      message: '项目版本',
      default: '1.0.0'
    },
    {
      name: 'projectDes',
      message: '项目描述',
      default: 'powerd by egg.js'
    },
    {
      name: 'author',
      message: '作者',
      default: username
    },
  ]);
  const pkgJsonFile = path.resolve(sourceTarget, 'package.json');
  let pkgJsonContent = fs.readFileSync(pkgJsonFile, { encoding: 'utf-8' });
  pkgJsonContent = pkgJsonContent
    .replace('--name', answers.projectName)
    .replace('--vs', answers.projectVs)
    .replace('--des', answers.projectDes)
    .replace('--author', answers.author);
  fs.writeFileSync(pkgJsonFile, pkgJsonContent);
}

async function copyProject(projectName, sourceTarget) {
  const copyTarget = path.resolve(process.cwd(), projectName);

  try {
    const stat = fs.statSync(copyTarget);
    if (stat && stat.isDirectory()) {
      log(red(`当前目录${projectName}文件夹已存在，请重命名项目或删除${projectName}文件夹`));
      return;
    }
  } catch (error) {};
  await exec(`cp -r ${sourceTarget} ${copyTarget}`);

}

module.exports = {
  initProject,
  customizeProject,
  copyProject
};