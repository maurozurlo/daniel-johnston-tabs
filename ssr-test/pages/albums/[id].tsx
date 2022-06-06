import Head from 'next/head'
import Link from 'next/link'
import executeQuery from '../../lib/db'
import { TTrack } from '../../types'

export async function getStaticPaths() {
  const albums = (await executeQuery(
    `SELECT albums.permalink FROM albums`,
    null
  )) as Array<{ permalink: string }>;

  return {
    paths: albums.map((album) => ({ params: { id: album.permalink } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const albumData = await executeQuery(
    `SELECT tracks.id, tracks.title, tracks.album, 
    tracks.track, albums.name, albums.id as albumId, tabs.permalink AS tabLink
    FROM albums 
    INNER JOIN tracks ON tracks.album=albums.id 
    LEFT JOIN tabs ON tracks.id=tabs.track_id
    WHERE albums.permalink=?`,
    [params.id]
  )
  const tracks = JSON.parse(JSON.stringify(albumData))

  return { props: { tracks } }
}

export default function Album({ tracks }: { tracks: TTrack[] }) {
  return (
    <>
      <Head>
        <title>{tracks && tracks[0]?.name}</title>
      </Head>
      <h1 className="text-lg text-slate-800 font-bold">
        {tracks && tracks[0]?.name}
      </h1>
      <ol>
        {tracks &&
          tracks.map((e) => {
            return (
              <li key={e.id}>
                {e.track} -{' '}
                {e.tabLink ? (
                  <Link href={`/songs/${e.tabLink}`}>
                    <a className="underline text-slate-600 hover:text-slate-800">
                      {e.title}
                    </a>
                  </Link>
                ) : (
                  <>{e.title}</>
                )}
              </li>
            )
          })}
      </ol>
    </>
  )
}
