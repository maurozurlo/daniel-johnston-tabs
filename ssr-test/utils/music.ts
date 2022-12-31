import { TKeys } from '../types'

export const keys: TKeys = [
  { name: 'Ab', value: 0, type: 'F' },
  { name: 'A', value: 1, type: 'N' },
  { name: 'A#', value: 2, type: 'S' },
  { name: 'Bb', value: 2, type: 'F' },
  { name: 'B', value: 3, type: 'N' },
  { name: 'C', value: 4, type: 'N' },
  { name: 'C#', value: 5, type: 'S' },
  { name: 'Db', value: 5, type: 'F' },
  { name: 'D', value: 6, type: 'N' },
  { name: 'D#', value: 7, type: 'S' },
  { name: 'Eb', value: 7, type: 'F' },
  { name: 'E', value: 8, type: 'N' },
  { name: 'F', value: 9, type: 'N' },
  { name: 'F#', value: 10, type: 'S' },
  { name: 'Gb', value: 10, type: 'F' },
  { name: 'G', value: 11, type: 'N' },
  { name: 'G#', value: 0, type: 'S' },
]

export const chordRegex = /^[A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*(\/[A-G][b\#]*)*$/

export const chordReplaceRegex = /([A-G][b\#]?(2|4|5|6|7|9|11|13|6\/9|7\-5|7\-9|7\#5|7\#9|7\+5|7\+9|b5|#5|#9|7b5|7b9|7sus2|7sus4|add2|add4|add9|aug|dim|dim7|m\/maj7|m6|m7|m7b5|m9|m11|m13|maj7|maj9|maj11|maj13|mb5|m|sus|sus2|sus4)*)/g;
