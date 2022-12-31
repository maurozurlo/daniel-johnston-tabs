import { chordRegex, chordReplaceRegex } from './music'


export const parseTab = (
  preContent: string,
) =>
{

  function isChordLine(input: string) {
    const text = input.replace(/\s+/g, ' ')
    const words = text.split(' ')
    if (
      words.some(function (word) {
        return word.length > 0 && !word.match(chordRegex)
      })
    ) {
      return false
    }
    return true
  }

  function parseChords(line: string) {
    const chords = []
    let match
    while ((match = chordReplaceRegex.exec(line)) !== null) {
      chords.push({
        text: match[0],
        spaces: match.index,
        chord: true,
      })
    }
    return chords
  }

  return preContent.split(/\r\n|\n/g).map((line) => {
    const chordLine = isChordLine(line)
    return chordLine ? parseChords(line) : [{text:line, chord:false}]
  })
}
