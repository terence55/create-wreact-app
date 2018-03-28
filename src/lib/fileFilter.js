var path = require('path');

var ignoredFileNames = ['node_modules', 'package-lock.json', 'statistics.html', '.vscode'];
var ignoredFiles = [];
for (var i = 0; i < ignoredFileNames.length; i++) {
  ignoredFiles.push(path.resolve(__dirname, '../template', ignoredFileNames[i]));
}

function fileFilter(src, dest) {
  return ignoredFiles.indexOf(src) < 0;
}

module.exports = fileFilter;
