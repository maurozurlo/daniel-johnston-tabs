import Head from 'next/head'
//import Link from 'next/link'
import executeQuery from '../../lib/db'
import Transposer from '../../components/Transposer'
import { TTab } from '../../types'
import { parseTab } from '../../utils/parser'
import { useState } from 'react'

export async function getStaticPaths() {
  const data = (await executeQuery(
    `SELECT permalink FROM tracks`,
    null
  )) as Array<{ permalink: string }>
  const paths = data.map((tab) => ({ params: { id: tab.permalink } }))
  return {
    paths,
    fallback: false,
  }
}


export async function getStaticProps({ params }: { params: { id: string } }) {
  const tabData = await executeQuery(
    `SELECT 
    t.id AS tabId,
    tr.title AS trackTitle, 
    t.tab, 
    t.key AS tabKey, 
    a.name AS albumName,
    tr.track AS trackNumber
    FROM tabs t
    JOIN tracks tr ON t.track_id = tr.id
    JOIN albums a ON tr.album = a.id
    WHERE tr.permalink = ?`,
    [params.id]
  )
  const defaultValue = {
    id: 0,
    trackTitle: "",
    trackId: 0,
    authorId: 0,
    authorName: "",
    tabKey: "Unknown",
    albumName: "",
    albumId: 0,
    albumPermalink: "",
    permalink: "",
    tab: ""
  }
  const [data] = JSON.parse(JSON.stringify(tabData))

  return { props: { data: Object.keys(data ?? {}).length ? data : defaultValue } }
}

const LyricLine: React.VFC<{
  line: {
    text?: string
    spaces?: number
    chord: boolean
  }
  isLastInLine: boolean
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

const Tab: React.VFC<{ data: TTab }> = ({
  data: { tab, trackTitle, tabKey },
}) => {
  const [parsedData, setParsedData] = useState(parseTab(decodeURI(tab)) ?? [])

  return (
    <>
      <Head>
        <title>{trackTitle}</title>
      </Head>
      <h1 className="text-3xl text-slate-800 text-center mb-2">{trackTitle}</h1>
      {tabKey !== 'Unknown' && (
        <Transposer songKey="C" transposeSong={(newKey) => alert(newKey)} />
      )}
      <pre style={{ overflowX: 'scroll' }}>
        {parsedData.map((lines, i) =>
          lines.map((line, j) => (
            <LyricLine
              key={`${i}-${j}`}
              line={line}
              isLastInLine={j === lines.length - 1}
            />
          ))
        )}
      </pre>
    </>
  )
}

export default Tab
