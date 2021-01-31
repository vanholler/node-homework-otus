const fs = require('fs')
const path = require('path')
const process = require("process")

function getRandomNum(min, max) {
  return parseInt(min + Math.random() * (max - min))
}

function displayProgress(num, isProcess) {
  if (isProcess) {
    console.clear()
    process.stdout.write(`Wait please, file are recording: ${(num/100000000*100).toFixed(2)}%`)   
  } else {
    console.clear()
    process.stdout.write(`Wow! signed up!`)
    process.stdout.write(`Now, we'are waiting then file will sorted...`)
  }
}

function createNumberedFile(folderPath) {
  return new Promise((res, rej) => {
      const fileName = 'numbers.txt'
      const filePath = path.join(folderPath, fileName)
      const fileSize =  1e+8 //100000000

      fs.writeFile(filePath, '', (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
        
      const writeable = fs.createWriteStream(filePath)

      writeable.on('finish', () => {
        res(filePath)
      })

      let accumulatedForWrite = []
      const write = () => {
        for (let i = 0; i < 400; i++) {
          if (i === 200 || i === 399) {
            accumulatedForWrite.push('\n')
          }
          accumulatedForWrite.push(`${getRandomNum(0, 100)}`)
        }
        
        writeable.write(accumulatedForWrite.toString(), () => {
            const stats = fs.statSync(filePath)

            if (stats.size < fileSize) {
              displayProgress(stats.size, true)
              write()
              accumulatedForWrite = []
            } else {
              displayProgress()
              writeable.end()
            }         
        })
      }

      write()
  })
}

module.exports = createNumberedFile