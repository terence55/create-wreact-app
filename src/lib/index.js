#!/usr/bin/env node

var program = require('commander');
var createApp = require('./createApp');

program
  .option('--info', 'output usage information.', function () {
    console.log(program.optionHelp());
    process.exit(0);
  })
  .parse(process.argv);

createApp(process.cwd(), program, function (err) {
  console.log(err);
  process.exit(0);
});