var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
var chalk = require('chalk');

var buildDir = path.resolve(process.cwd(), 'build');

function publish(done) {
  shell.cd(buildDir);
  var args = ['publish'];
  var publishNpm = process.env.PUBLISH_NPM_CLI || 'npm';
  shell.exec(publishNpm + ' publish', function(code) {
    done(code);
  });
}

fs.exists(path.resolve(process.cwd(), 'build'), function (exists) {
  if (!exists) {
    console.log(chalk.red('Please build first.'));
    return;
  }
  publish(function (code) {
    if (code === 0) {
      console.log(chalk.green('Publish finished.'));
    } else {
      console.log(chalk.red('Publish fail.'));
    }
  });
});
