const fs = require('fs')
const path = require('path')
const { getPermalink } = require('../utils')

let content = '"id","title","album","track", "permalink"'
let idx = 0

fs.readdirSync('tracks', { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .forEach((item) => {
    if (item.name.indexOf('txt') === -1) return
    //item.name
    const allFileContents = fs.readFileSync(path.join('tracks', item.name), 'utf-8')
    content += allFileContents
      .split(/\r?\n/)
      .reduce(
        (acc, curr) => {
          //"1","Grievances","1","1"
          // Check if usable line
          //| title1 = Grievances
          if (curr.indexOf('title') === -1) return acc
          const cleanup = curr.substring(
            curr.indexOf('title') + 'title'.length,
            curr.length,
          )
          const id = idx + 1
          if (!cleanup.split('= ')[1]) return acc
          const title = cleanup.split('= ')[1].replace(/[\][]/g, '')

          if (title === '') return acc

          const album = item.name.split('.txt')[0]
          const track = cleanup.split(' ')[0]
          const permalink = getPermalink(title)
          idx++ 

          return [
            ...acc,
            [id, title, album, track, permalink].map((v) => `"${v}"`).join(','),
          ]
        },
        [''],
      )
      .join('\n')
  })

fs.writeFile(path.join(__dirname, '../', 'output', 'tracks.csv'), content, function (err) {
  if (err) {
    return console.log(err)
  }
})
