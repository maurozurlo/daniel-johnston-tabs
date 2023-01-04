const fs = require('fs')
const path = require('path')
const {
  getPermalink,
  getTitleAndTrackNumberFromLine,
  tryAndGetTab,
  tryAndGetKeyFromFile,
} = require('../utils')

let content = '"id","title","author","tab","key","permalink"'
const tracks = {}
let idx = 0

const removeManualKey = (data, hasKey) => {
  if(!data) return ''
  
  if(hasKey){
    return data.split('\n').slice(1).join('\n')
  } 
  return data
}

fs.readdirSync('tracks', { withFileTypes: true })
  .filter((item) => !item.isDirectory())
  .forEach((item) => {
    if (item.name.indexOf('txt') === -1) return
    //item.name
    const allFileContents = fs.readFileSync(
      path.join('tracks', item.name),
      'utf-8',
    )
    content += allFileContents
      .split(/\r?\n/)
      .reduce(
        (acc, curr) => {
          const id = idx + 1
          const album = item.name.split('.txt')[0]

          const { title, track } = getTitleAndTrackNumberFromLine(curr, album)
          if (!title) return acc
          
          const permalink = getPermalink(title)

          const potentialTabFile = path
            .join(__dirname, '../', 'tabs', album, track)
            .concat('.txt')
          const tabData = tryAndGetTab(potentialTabFile)

          // Add link
          if (tracks[permalink]) {
            //console.log('Following track is dup:', permalink, album, track)
            tracks[permalink].links.push({ album, track })
            return acc
          } else {
            //console.log('Following track is init:', permalink, album, track)
            tracks[permalink] = {
              id,
              tab: tabData ? 1 : 0,
              links: [{ album, track }],
            }
          }

          const author = ''
          const { key, hasManualKey } = tabData
            ? tryAndGetKeyFromFile(tabData)
            : { key: 'Unknown' }

          const tabContent = encodeURI(removeManualKey(tabData, hasManualKey))

          idx++
          return [
            ...acc,
            [id, title, author, tabContent, key || 'Unknown', permalink]
              .map((v) => `"${v}"`)
              .join(','),
          ]
        },
        [''],
      )
      .join('\n')
  })

  const createLinksFile = () => {
    let idx = 0;
    const links = Object.keys(tracks).map((track, i) => {
      return tracks[track].links.map((trackLink, j) => {
        idx++
        return createCsvRow(idx, tracks[track].id, trackLink.album, trackLink.track, tracks[track].tab);
      }).join('\n');
    }).join('\n');
    return links;
  }
  
  const createCsvRow = (index, trackId, album, track, tab) => {
    const row = [index, trackId, album, track, tab]
      .map((value) => `"${value}"`)
      .join(',');
    return row;
  }
  

fs.writeFileSync(
  path.join(__dirname, '../', 'output', 'tracks.csv'),
  content,
  function (err) {
    if (err) {
      return console.log(err)
    }
  },
)

fs.writeFileSync(
  path.join(__dirname, '../', 'output', 'album_tracks.csv'),
  '"link_id", "tab_id", "album_id","track_number", "tabbed"\n'.concat(createLinksFile()),
  function (err) {
    if (err) {
      return console.log(err)
    }
  },
)
