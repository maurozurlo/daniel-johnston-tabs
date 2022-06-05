const fs = require('fs')
const Papa = require('papaparse')
const { getPermalink } = require('../utils')

let data = []

const readCSV = (filePath) => {
  const csvFile = fs.readFileSync(filePath)
  const csvData = csvFile.toString()
  Papa.parse(csvData, {
    header: true,
    complete: (results) => {
      console.log('Complete', results.data.length, 'records.')
      data = results.data
    },
  })
}

readCSV('../tracks/testdata.csv')

const getRow = (albumId, trackNo) => {
  return data.find((row) => {
    return row.album === albumId && row.track === trackNo
  })
}

let content = '"id","track_id","author","timestamp","tab", "permalink"\n'
let idx = 0

fs.readdirSync('./', { withFileTypes: true })
  .filter((f) => f.isDirectory())
  .forEach((folder) => {
    //Read files inside folder
    fs.readdirSync(`./${folder.name}/`, { withFileTypes: true })
      .filter((file) => !file.isDirectory())
      .forEach((item) => {
        if (item.name.indexOf('txt') === -1) return
        //Read tab
        const allFileContents = fs.readFileSync(
          `./${folder.name}/${item.name}`,
          'utf-8',
        )

        //Return string
        const tabData = () => {
          const trackRecord = getRow(
            folder.name,
            item.name.slice(0, item.name.length - 4),
          )
          const id = idx + 1
          const track_id = trackRecord.id
          const author = 1
          const timestamp = new Date().toJSON().slice(0, 19).replace('T', ' ')
          const tab = encodeURI(allFileContents)
          const permalink = getPermalink(trackRecord.title)
            
          return `${[id, track_id, author, timestamp, tab, permalink]
            .map((v) => `"${v}"`)
            .join(',')}\n`
        }

        content += tabData()
        idx++
      })
  })

fs.writeFile('testdata.csv', content, function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)
})
