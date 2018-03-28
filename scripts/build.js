var path = require('path');
var fs = require('fs-extra');
var rimraf = require('rimraf');
var chalk = require('chalk');

var fileFilter = require('../src/lib/fileFilter');
var buildDir = path.resolve(process.cwd(), 'build');

var filesToCopy = [
  'src',
  '.npmignore',
  'package.json',
  'README.md'
];

function publish() {
  rimraf.sync(buildDir);
  try {
    for (var i = 0; i < filesToCopy.length; i++) {
      var fullPath = path.resolve(process.cwd(), filesToCopy[i]);
      var file = fs.statSync(fullPath);
      if (file.isDirectory()) {
        fs.copySync(fullPath, buildDir, { filter : fileFilter});
      } else {
        fs.copySync(fullPath, path.resolve(buildDir, filesToCopy[i]));
      }
    }
    console.log(chalk.green('Build success.'));
  } catch (err) {
    console.log(chalk.red(err));
  }
}

publish();
