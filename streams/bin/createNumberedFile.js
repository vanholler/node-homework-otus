const fs = require('fs')
const path = require('path')
const process = require("process")

function getRandomNum(min, max) {
  return parseInt(min + Math.random() * (max - min))
}

function displayProgress(num, isProcess) {
  if (isProcess) {
    console.clear()
    process.stdout.write(`Wait please, file are recording: ${num} from 100.000.000`)
  } else {
    console.clear()
    process.stdout.write(`Wow! signed up!`)
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

      const write = () => {
        writeable.write(`${getRandomNum(0, 55)},`, () => {
            const stats = fs.statSync(filePath)
            let delayNotification = 0
            if (stats.size < fileSize) {
              displayProgress(stats.size, true)
              write()
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