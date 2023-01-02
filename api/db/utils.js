const getPermalink = (title) => {
  return title
    .toLowerCase()
    .split(/[\s',\\/?\\+]/)
    .map((word) => word.replace(/[\\(\\)\\!]/g, ''))
    .join('-')
    .replace('&', 'and')
    .replace(/-+/g, '-')
    .replace(/-$/, '')
    .trim();
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


module.exports = {
  getPermalink,
  getSongKey
}
