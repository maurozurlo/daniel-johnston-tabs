export type TAlbum = {
  id: number;
  name: string;
  released: Date;
  featuring: string;
  permalink: string;
}

export type TTrack = {
  id: number;
  title: string;
  album: number;
  track: number;
  name: string;
  albumId: number;
  tabLink?: string;
}

export type TTab = {
  id: number;
  trackId: number;
  authorId: number;
  albumId: string;
  authorName: string;
  timestamp: Date;
  tab: string;
  permalink: string;
  albumName: string;
  albumPermalink: string;
  trackTitle: string;
}

export type TKey = 'Ab' | 'A' | 'A#' | 'Bb' | 'B' | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F' | 'F#' | 'Gb' | 'G' | 'G#'

export type TNote = 'N' | 'S' | 'F'

export interface TKeyValue {
  name: TKey
  value: number
  type: TNote
}

export type TKeys = Array<TKeyValue>