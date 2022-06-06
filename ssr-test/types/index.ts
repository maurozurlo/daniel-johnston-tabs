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