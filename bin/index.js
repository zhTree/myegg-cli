const program = require('commander');
const { version } = require('../package.json');
const { initProject, customizeProject, copyProject } = require('../lib/lifecycle');
const { red, yellow } = require('chalk');
const log = console.log;

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
    log(yellow(`
      To run this project:
      cd ${projectName} && npm i && npm run dev
    `));
    // console.log(destination);
  });

program.on('help', () => {
  console.log('');
});

program
  .parse(process.argv);
