const fs = require('fs')
const path = require('path')
const Papa = require('papaparse')
const {getSongKey} = require('../utils')

function getData (filepath) {
  const file = fs.createReadStream(filepath)
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete (results) {
        resolve(results.data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

const getRow = (data, albumId, trackNo) => {
  return data.find((row) => {
    return row.album === albumId && row.track === trackNo
  })
}

let content = '"id","track_id","author","timestamp","tab", "key"\n'
let idx = 0

const tryAndGetKeyFromFile = (contents) => {
  return (
    contents.split(/\r?\n|\r|\n/g)[0].split('Key: ')[1] ||
    getSongKey(contents) ||
    'Unknown'
  )
}

const processData = (albumData) => {
  fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((f) => f.isDirectory())
  .forEach((folder) => {
    //Read files inside folder
    fs.readdirSync(path.join(__dirname, folder.name), { withFileTypes: true })
      .filter((file) => !file.isDirectory())
      .forEach((item) => {
        if (item.name.indexOf('txt') === -1) return
        //Read tab
        const allFileContents = fs.readFileSync(
          path.join(__dirname, folder.name, item.name),
          'utf-8',
        )

        //Return string
        const tabData = () => {
          const trackRecord = getRow(
            albumData,
            folder.name,
            item.name.slice(0, item.name.length - 4),
          )
          const id = idx + 1
          const track_id = trackRecord.id
          const author = 1
          const key = tryAndGetKeyFromFile(allFileContents)
          const timestamp = new Date().toJSON().slice(0, 19).replace('T', ' ')
          const tab = encodeURI(allFileContents)

          return `${[id, track_id, author, timestamp, tab, key]
            .map((v) => `"${v}"`)
            .join(',')}\n`
        }

        content += tabData()
        idx++
      })
  })

fs.writeFileSync(path.join(__dirname, '../', 'output', 'tabs.csv'), content, function (err) {
  if (err) {
    return console.log(err)
  }
})
}

(async function init(){
  const data = await getData(path.join(__dirname, '../', 'output', 'tracks.csv'))
  processData(data);
})()

