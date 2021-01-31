const path = require('path')
const fs = require('fs')

function joinFiles(srcDir, files) {
  return new Promise((res, rej) => {
    const resultFilePath = path.join(srcDir, 'sorted.txt')
    
    const writable = fs.createWriteStream(resultFilePath)

    let currentStream = 0

    const streams = files.map((file, index) => {
      const readable = fs.createReadStream(file)

      readable.on('data', (chunk) => {
        writable.write(chunk)
      })

      readable.on('end', () => {
        if (streams[index + 1]) {
          streams[index + 1].resume()
        }   
      })

      return readable
    })

    res(resultFilePath)
  })
}

module.exports = joinFiles