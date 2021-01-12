#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const tree = require('../tree');

program
  .version(pkg.version)
  .option(
    '-d, --max-depth <n>',
    'глубина директории',
    parseInt,
  )

program.parse(process.argv);
const path = program.args[0] || '.';

const options = {
  maxDepth: program.maxDepth
};

const output = tree(path, options);
console.log(output);