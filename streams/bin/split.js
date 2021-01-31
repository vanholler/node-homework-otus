const fs = require('fs')
const stream = require('stream')
const util = require('util')
const pipeline = util.promisify(stream.pipeline)

function splitFile(srcFile, dirToSave) {
  return new Promise((res, rej) => {

    fs.mkdir(dirToSave, { recursive: true }, (err) => {
      if (err) throw err;
    })

    const readable = fs.createReadStream(srcFile)
    const files = []

    readable.on('data', (chunk) => {
      const filePath = `${dirToSave}/sorting.txt`
      const writeable = fs.createWriteStream(filePath)
      const sorted = chunk.toString().split(',').sort((a, b) => a - b)
      
      const splitRow = sorted.map((num, index) => {
        if (sorted[index] !== sorted[index + 1]) {
          return num + '\n'
        }
        return num
      })

      writeable.write(splitRow.join(','), () => {
        files.push(filePath)
      })
    })

    readable.on('end', () => {
      res(files)
    })
  })
}

module.exports = splitFile