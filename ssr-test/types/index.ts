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
  track: number;
  permalink: string;
  albumId: number;
  permalinkExists: string;
}

export type TTab = {
  id: number
  trackTitle: string
  trackId: number
  authorId: number
  authorName: string
  tabKey: string
  albumName: string
  albumId: number
  albumPermalink: string
  permalink: string
  tab: string
}

export type TKey = 'Ab' | 'A' | 'A#' | 'Bb' | 'B' | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#'

export type TNote = 'N' | 'S' | 'F'

export interface TKeyValue {
  name: TKey
  value: number
  type: TNote
}

export type TKeys = Array<TKeyValue>