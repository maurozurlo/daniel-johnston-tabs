import Head from 'next/head'
import Link from 'next/link'
import executeQuery from '../../lib/db'
import { TTrack } from '../../types'

export async function getStaticPaths() {
  const albums = (await executeQuery(
    `SELECT albums.permalink FROM albums`,
    null
  )) as Array<{ permalink: string }>

  return {
    paths: albums.map((album) => ({ params: { id: album.permalink } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const albumData = await executeQuery(
    `SELECT a.name AS albumName, t.title AS trackTitle, t.permalink AS trackPermalink, 
    at.track_number AS trackNumber, at.tabbed
    FROM albums a
    JOIN album_tracks at ON a.id = at.album_id
    JOIN tracks t ON at.tab_id = t.id
    WHERE a.permalink = ?;`,
    [params.id]
  )
  const tracks = JSON.parse(JSON.stringify(albumData))

  return { props: { tracks } }
}

export default function Album({ tracks }: { tracks: TTrack[] }) {
  return (
    <>
      <Head>
        <title>{tracks && tracks[0]?.albumName}</title>
      </Head>
      <h1 className="text-lg text-slate-800 font-bold">
        {tracks && tracks[0]?.albumName}
      </h1>
      <ol>
        {tracks &&
          tracks.map((e, i) => {
            return (
              <li key={i}>
                {i + 1} -{' '}
                {e.tabbed ? (
                  <Link href={`/songs/${e.trackPermalink}`}>
                    <a className="underline text-slate-600 hover:text-slate-800">
                      {e.trackTitle}
                    </a>
                  </Link>
                ) : (
                  <>{e.trackTitle}</>
                )}
              </li>
            )
          })}
      </ol>
    </>
  )
}
