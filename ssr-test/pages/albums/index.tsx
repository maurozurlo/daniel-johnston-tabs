import Head from 'next/head'
import executeQuery from '../../lib/db'
import { TAlbum } from '../../types'
import AlbumCard from '../../components/AlbumCard'

export async function getStaticProps() {
  const albums = await executeQuery('SELECT * FROM albums', null)
  return {
    props: {
      albums: JSON.parse(JSON.stringify(albums)),
    },
  }
}

export default function Albums({ albums }: { albums: TAlbum[] }) {
  return (
    <>
      <Head>
        <title>Daniel Johnston Albums</title>
      </Head>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {albums &&
          albums.map((album) => <AlbumCard key={album.id} album={album} />)}
      </div>
    </>
  )
}
