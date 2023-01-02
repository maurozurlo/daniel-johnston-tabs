import Head from 'next/head'
//import Link from 'next/link'
import executeQuery from '../../lib/db'
import Transposer from '../../components/Transposer'
import { TTab } from '../../types'
import { parseTab } from '../../utils/parser'
import { useState } from 'react'
import Link from 'next/link'

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
    `SELECT a.name AS albumName, 
    a.permalink AS albumPermalink, a.released as albumReleased, 
    t.title AS trackTitle, t.tab, t.key, at.track_number AS trackNumber
    FROM tracks t
    JOIN album_tracks at ON t.id = at.tab_id
    JOIN albums a ON at.album_id = a.id
    WHERE t.permalink = ?;`,
    [params.id]
  )

  const defaultValue = {
    albumName: "Unknown",
    albumPermalink: "404",
    albumReleased: "1990",
    trackTitle: "Unknown",
    tab: "",
    key: "Unknown",
    trackNumber: 0
  }

  const data = JSON.parse(JSON.stringify(tabData))
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

const Tab: React.VFC<{ data: TTab[] }> = ({ data }) => {
  const [parsedData, setParsedData] = useState(
    parseTab(decodeURI(data[0].tab)) ?? []
  )

  return (
    <>
      <Head>
        <title>{data[0].trackTitle}</title>
      </Head>
      <h1 className="text-3xl text-slate-800 text-center mb-2">
        {data[0].trackTitle}
      </h1>
      {data[0].key !== 'Unknown' && (
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

      <hr className='my-4' />
      <h2>Appears on:</h2>
      <ul>
        {data.map((row, i) => (
          <li key={i}>
            <Link href={`/albums/${row.albumPermalink}`}>
              <a className="underline text-slate-600 hover:text-slate-800">
                {row.trackNumber} - {row.albumName} ({new Date(Date.parse(row.albumReleased)).getFullYear()})
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Tab
