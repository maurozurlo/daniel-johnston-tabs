const fs = require('fs')
const path = require('path')
const { getPermalink } = require('../utils')

const allFileContents = fs.readFileSync(path.join(__dirname, 'albums.txt'), 'utf-8')
const content = allFileContents.split(/\r?\n/).reduce(
  (acc, curr, idx) => {
    //"1","1990","1988-04-08 00:57:24","Lee Renaldo, Steve Shelley, Kramer","1990",
    const id = idx + 1
    const name = curr.split(' (')[0].replace(/[":]/g, ``)
    const date = `${curr.match(/\d{4}/)[0]}-01-01 00:00:00`
    const featuring = ''
    const permalink = getPermalink(name)
    return [
      ...acc,
      [id, name, date, featuring, permalink].map((v) => `"${v}"`).join(','),
    ]
  },
  ['"id","name","released","featuring","permalink"'],
)

fs.writeFile(path.join(__dirname, '../', 'output', 'albums.csv'), content.join('\n'), function (err) {
  if (err) {
    return console.log(err)
  }
})
