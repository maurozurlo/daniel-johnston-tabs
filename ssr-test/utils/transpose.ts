import { TKey, TKeyValue } from '../types'
import { chordRegex, keys } from './music'

const getDelta = (oldIndex: number, newIndex: number) => {
  if (oldIndex > newIndex) {
    return 0 - (oldIndex - newIndex)
  }
  if (oldIndex < newIndex) {
    return newIndex - oldIndex
  }
  return 0
}

const getKeyByName = (name: string) => {
  if (name.charAt(name.length - 1) === 'm') {
    name = name.substring(0, name.length - 1)
  }
  for (let i = 0; i < keys.length; i++) {
    if (name === keys[i].name) {
      return keys[i]
    }
  }
  return keys[0]
}

const getNewKey = (oldKey: string, delta: number, targetKey: TKeyValue) => {
  let keyValue = getKeyByName(oldKey).value + delta
  if (keyValue > 11) {
    keyValue -= 12
  } else if (keyValue < 0) {
    keyValue += 12
  }
  let i = 0
  if (
    keyValue === 0 ||
    keyValue === 2 ||
    keyValue === 5 ||
    keyValue === 7 ||
    keyValue === 10
  ) {
    // Return the Flat or Sharp Key
    switch (targetKey.name) {
      case 'A':
      case 'A#':
      case 'B':
      case 'C':
      case 'C#':
      case 'D':
      case 'D#':
      case 'E':
      case 'F#':
      case 'G':
      case 'G#':
        for (; i < keys.length; i++) {
          if (keys[i].value === keyValue && keys[i].type === 'S') {
            return keys[i]
          }
        }
      default:
        for (; i < keys.length; i++) {
          if (keys[i].value === keyValue && keys[i].type === 'F') {
            return keys[i]
          }
        }
    }
  } else {
    // Return the Natural Key
    for (; i < keys.length; i++) {
      if (keys[i].value === keyValue) {
        return keys[i]
      }
    }
  }
  return keys[0]
}

const transposeNote = (
  oldChord: string,
  interval: number,
  rootNote: TKeyValue
) => {
  const { root: chordRoot } = getChordRootAndType(oldChord)
  const newKey = getNewKey(chordRoot, interval, rootNote)
  const newChord = newKey.name + oldChord.substr(chordRoot.length)
  return newChord
}

export const transposeSong = (
  data: Array<
    | {
        text: string
        spaces: number
        chord: boolean
      }[]
    | {
        text: string
        chord: boolean
      }[]
  >,
  songKey: string,
  newKey: string
) => {
  const targetKey = getKeyByName(newKey)
  const currentKey = getKeyByName(songKey)
  const delta = getDelta(currentKey.value, targetKey.value)

  if (currentKey.name == targetKey.name) {
    return data;
  }

  const lineValue = (text: string, chord: boolean) => {
    return text && chord ? transposeNote(text, delta, targetKey) : text
  }

  return data.map((lines) =>
    lines.map((line) => ({
      ...line,
      text: lineValue(line.text, line.chord),
    }))
  )
}

export const getChordRootAndType = (chord: string) => {
  // Use a regular expression to extract the root and type of the chord
  const matches = chord.match(chordRegex)

  const [fullChord, type] = matches ?? []
  const typeLength = type ? -type?.length : fullChord?.length
  const root = fullChord?.slice(0, typeLength) as TKey

  return {
    root: root ?? 'C',
    type: type ?? '',
  }
}
