var path = require('path');
var shell = require('shelljs');

var buildCmd = path.resolve(__dirname, '../src/lib/index.js');

shell.exec(buildCmd + ' testPrjName');
