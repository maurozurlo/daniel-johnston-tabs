import Head from 'next/head'
//import Link from 'next/link'
import executeQuery from '../../lib/db'
import Transposer from '../../components/Transposer'
import { TTab } from '../../types'
import { parseTab } from '../../utils/parser'
import { useState } from 'react'

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

const LyricLine: React.VFC<{
  line: {
    text?: string
    spaces?: number
    chord: boolean
  };
  isLastInLine: boolean;
}> = ({ line, isLastInLine }) => {
  if (line.chord) {
    return (
      <>
      <span>{' '.repeat(line.spaces || 0)}</span>
        <span className="font-bold text-red-600">{line.text}</span>
        {isLastInLine && <br />}
      </>
    )
  }
  return (
    <>
      <span>{line.text}</span>
      <br />
    </>
  )
}

export default function Tab({ tab }: { tab: TTab }) {
  const [parsedData, setParsedData] = useState(
    parseTab(decodeURI(tab.tab)) ?? []
  )

  return (
    <>
      <Head>
        <title>{tab.trackTitle && tab.trackTitle}</title>
      </Head>
      <h1 className="text-3xl text-slate-800 text-center mb-2">
        {tab.trackTitle}
      </h1>
      <Transposer songKey="C" transposeSong={(newKey) => alert(newKey)} />
      <pre style={{ overflowX: 'scroll' }}>
        {parsedData.map((lines, i) =>
          lines.map((line, j) => <LyricLine key={`${i}-${j}`} line={line} isLastInLine={j === lines.length - 1} />)
        )}
      </pre>
    </>
  )
}
