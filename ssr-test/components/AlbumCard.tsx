import React, {useState} from 'react'
import Image from 'next/image'
import {cn} from '../utils/style'
import {TAlbum} from '../types'

type Props = {
  album: TAlbum
}

export default function AlbumCard({album}: Props) {
  const [isLoading, setLoading] = useState(true)
  return (
    <a href={`albums/${album.permalink}`} className="group">
      <div className='aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200'>
        <Image 
        src={`/${album.id}.jpg`}
        alt={album.name}
        className={cn('group-hover:opacity-75 duration-200 ease-in-out',
          isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
        )}
        layout='fill'
        objectFit='cover'
        onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className='mt-4 text-sm text-gray-700'>{new Date(album.released).toLocaleDateString('en-us', { year:"numeric"}) }</h3>
      <p className='mt-1 text-lg font-medium text-gray-900'>{album.name}</p>
    </a>
  )
}
