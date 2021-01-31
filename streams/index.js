const path = require('path')
const createNumberedFile = require('./bin/createNumberedFile')
const splitFile = require('./bin/split')
const joinFile = require('./bin/join')

const run = async () => {
  const srcDir = path.resolve(process.cwd(), 'files')
  const numberedFilePath = await createNumberedFile(srcDir)
  const dirSplitedFiles = path.resolve(srcDir, 'sortedFile')
  const files = await splitFile(numberedFilePath, dirSplitedFiles)
  const resultFile = await joinFile(srcDir, files)
  console.log("result:", resultFile)
}

run()