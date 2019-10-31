const gitDownload = require('download-git-repo');
const ora = require('ora');

function download(source, target) {
  return new Promise((res, rej) => {
    const spinner = ora('正在下载模板');
    spinner.start();
    gitDownload(source, target, function(err) {
      if (err) {
        spinner.failed('下载失败');
        rej(err);
        return;
      }
      spinner.succeed('模板下载成功');
      res();
    })
  });
}

module.exports = {
  download
};