const fs = require('fs');
const nodePath = require('path');

const DEFAULT_OPTION = {
  maxDepth: Number.POSITIVE_INFINITY,
}
const SYMBOLS = {
  BRANCH: '├── ',
  EMPTY: '',
  INDENT: '    ',
  LAST_BRANCH: '└── ',
  VERTICAL: '│   ',
}


function print( filename, path, currentDepth, precedingSymbols, options, isLast) {
  const isDir = fs.lstatSync(path).isDirectory();
  const isFile = !isDir;
  const lines = [];


  if (currentDepth > options.maxDepth) {
    return lines;
  }
  const line = [precedingSymbols];

  if (currentDepth >= 1) {
    line.push(isLast ? SYMBOLS.LAST_BRANCH : SYMBOLS.BRANCH);
  }
  line.push(filename);
  lines.push(line.join(''));

  if (isFile) {
    return lines;
  }

  let contents = fs.readdirSync(path);

  contents.forEach((content, index) => {
    const isCurrentLast = index === contents.length - 1;
    const linesForFile = print(
      content,
      nodePath.join(path, content),
      currentDepth + 1,
      precedingSymbols +
        (currentDepth >= 1
          ? isLast
            ? SYMBOLS.INDENT
            : SYMBOLS.VERTICAL
          : SYMBOLS.EMPTY),
      options,
      isCurrentLast,
    );
    lines.push.apply(lines, linesForFile);
  });
  return lines;
}

function tree(path, options) {
  const combinedOptions = Object.assign({}, DEFAULT_OPTION, options);
  return print(
    nodePath.basename(nodePath.join(process.cwd(), path)),
    path,
    0,
    '',
    combinedOptions,
    true
  ).join('\n');
}

const getTree = module.exports = {tree, print}