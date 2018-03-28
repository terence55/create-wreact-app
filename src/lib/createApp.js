var path = require('path');
var fs = require('fs-extra');
var chalk = require('chalk');

var fileFilter = require('./fileFilter');

module.exports = function (cwd, program) {
  console.log('Start to create app...\n');
  if (!program.args[0]) {
    console.log(chalk.red('App name is missing.\n'));
    return;
  }
  var dir = program.args[0];
  if (fs.existsSync(dir)) {
    console.log(chalk.red('Dir name `' + chalk.red(dir) + '` is exists, please choose another name.\n'));
    return;
  }
  fs.ensureDirSync(dir);
  try {
    fs.copySync(path.resolve(__dirname, '../template'), dir, { filter : fileFilter})
    console.log(chalk.green('App files have been copied.\n'));
  } catch (err) {
    console.log(chalk.red(err));
  }

  var packageFilePath = path.resolve(cwd, dir, 'package.json');
  var packageObj = fs.readJsonSync(packageFilePath);
  packageObj.name = dir;
  fs.writeJsonSync(packageFilePath, packageObj, { spaces: '  ' });

  console.log(chalk.green('App `' + dir + '` has been created.\n'));
}
