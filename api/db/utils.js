const fs = require('fs')

const getPermalink = (title) => {
  return title
    .toLowerCase()
    .split(/[\s',\\/?\\+]/)
    .map((word) => word.replace(/[\\(\\)\\!]/g, ''))
    .join('-')
    .replace('&', 'and')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .trim()
}

const getSongKey = (songTab) => {
  // Split the song tab into lines
  const lines = songTab.split(/\n/)

  // Initialize an object to store the chord counts
  const chordCounts = {}

  // Loop through the lines
  for (let line of lines) {
    // Check if the line contains only capital letters and spaces
    if (/^[A-Z\s]+$/.test(line)) {
      // Split the line into an array of chords
      const chords = line.split(/\s+/)

      // Loop through the chords
      for (let chord of chords) {
        // Increment the count for the chord
        chordCounts[chord] = (chordCounts[chord] || 0) + 1
      }
    }
  }

  // Find the chord with the highest count
  let mostCommonChord = null
  let highestCount = 0
  for (let chord in chordCounts) {
    if (chordCounts[chord] > highestCount) {
      mostCommonChord = chord
      highestCount = chordCounts[chord]
    }
  }

  // Return the most common chord as the song key
  return mostCommonChord
}

const getTitleAndTrackNumberFromLine = (line) => {
  //"1","Grievances","1","1"
  // Check if usable line
  //| title1 = Grievances
  if (line.indexOf('title') === -1) return ''
  const cleanup = line.substring(
    line.indexOf('title') + 'title'.length,
    line.length,
  )

  if (!cleanup.split('= ')[1]) return ''
  return {
    title: cleanup.split('= ')[1].replace(/[\][]/g, ''),
    track: cleanup.split(' ')[0]
  }
}

const tryAndGetTab = (fileName) => {
  try {
    return fs.readFileSync(
      fileName,
      'utf-8',
    )
  } catch (err) {
    return ""
    // Here you get the error when the file was not found,
    // but you also get any other error
  }
}

const tryAndGetKeyFromFile = (contents) => {
  const hasManualKey = contents.split(/\r?\n|\r|\n/g)[0].split('Key: ')[1]
  return {
    key: hasManualKey ?? getSongKey(contents) ?? 'Unknown',
    hasManualKey: Boolean(hasManualKey)
  }
}

module.exports = {
  getPermalink,
  getTitleAndTrackNumberFromLine,
  tryAndGetTab,
  tryAndGetKeyFromFile
}
