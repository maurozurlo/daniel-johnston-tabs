import Head from 'next/head'
//import Link from 'next/link'
import executeQuery from '../../lib/db'
import { TTab } from '../../types'

export async function getStaticPaths() {
  const tabs = (await executeQuery(
    `SELECT tabs.permalink FROM tabs`,
    null
  )) as Array<{ permalink: string }>
  return {
    paths: tabs.map((tab) => ({ params: { id: tab.permalink } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const tabData = await executeQuery(
    `SELECT tabs.id, tracks.title AS trackTitle, tracks.id AS trackId,
    tabs.author AS authorId, users.username AS authorName, 
    albums.name AS albumName, albums.id as albumId, 
    albums.permalink AS albumPermalink, tabs.permalink, tabs.tab
    FROM tabs
    INNER JOIN tracks ON tabs.track_id=tracks.id
    JOIN albums ON tracks.album=albums.id 
    JOIN users ON users.id=tabs.author
    WHERE tabs.permalink=?`,
    [params.id]
  )
  const [tab] = JSON.parse(JSON.stringify(tabData))
  return { props: { tab } }
}

export default function Tab({ tab }: { tab: TTab }) {
  return (
    <>
      <Head>
        <title>{tab.trackTitle && tab.trackTitle}</title>
      </Head>
      <h1 className="text-lg text-slate-800 font-bold">{tab.trackTitle}</h1>
      <pre>{decodeURI(tab.tab)}</pre>
    </>
  )
}
