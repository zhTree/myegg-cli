#!/usr/bin/env node
const program = require('commander');
const { version } = require('../package.json');
const {
  initProject,
  customizeProject,
  copyProject,
  checkFirst,
  checkFolder,
  checkFile,
  addFile
} = require('../lib/lifecycle');
const { red, yellow } = require('chalk');
const log = console.log;

function check(type, name) {
  if (checkFirst() || checkFolder(type) || checkFile(type, name)) return true;
}

program
  .version(version, '-v, --version')
  .description('趣头条 前端服务组 eggjs脚手架');

program
  .command('init <project-name>')
  .description('创建egg项目')
  .action(async (projectName, destination) => {
    const sourceTarget = await initProject();
    if (!sourceTarget) return;
    await customizeProject(projectName, sourceTarget);
    await copyProject(projectName, sourceTarget);
    log(
      yellow(`
      To run this project:
      cd ${projectName} && npm i && npm run dev
    `)
    );
    // console.log(destination);
  });

program
  .command('controller <controller-name>')
  .description('添加控制器')
  .action(async (name, destination) => {
    if (check('controller', name)) return;
    await addFile('controller', name);
  });

program
  .command('service <service-name>')
  .description('添加服务')
  .action(async (name, destination) => {
    if (check('service', name)) return;
    await addFile('service', name);
  });

program
  .command('model <model-name>')
  .description('添加模型')
  .action(async (name, destination) => {
    if (check('model', name)) return;
    await addFile('model', name);
  });

program
  .command('bulk <bulk-name>')
  .description('添加模型, 服务，控制器')
  .action(async (name, destination) => {
    if (check('model', name)) return;
    if (check('service', name)) return;
    if (check('controller', name)) return;
    addFile('model', name);
    addFile('service', name);
    addFile('controller', name);
  });

program.on('help', () => {
  console.log('');
});

program.parse(process.argv);
