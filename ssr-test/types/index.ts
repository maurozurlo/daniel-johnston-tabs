export type TAlbum = {
  id: number;
  name: string;
  released: Date;
  featuring: string;
  permalink: string;
}

export type TTrack = {
  trackTitle: string;
  albumName: string;
  trackNumber: number;
  trackPermalink: string;
  tabbed: number;
}

export type TTab = {
  albumName: string
  albumPermalink: string
  albumReleased: string
  trackTitle: string
  tab: string
  key: string
  trackNumber: number
}

export type TKey = 'Ab' | 'A' | 'A#' | 'Bb' | 'B' | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#'

export type TNote = 'N' | 'S' | 'F'

export interface TKeyValue {
  name: TKey
  value: number
  type: TNote
}

export type TSearch = {
  name: string,
  permalink: string,
  type: string
}

export type TKeys = Array<TKeyValue>