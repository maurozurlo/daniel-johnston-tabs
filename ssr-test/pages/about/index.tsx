import React from 'react'

type Props = {}

export default function index({}: Props) {
  return (
    <div className='flex flex-col'>
      <h1 className='text-lg text-slate-800 font-bold py-4'>About</h1>
      <p className='text-left'>
        Daniel's catalog is incredibly vast, I just wanted to provide a pretty platform to share tabs for as many of his songs as I can get.
      </p>
      <p>
          Soon more info...
      </p>
      <p className='text-slate-600'>-Miauz</p>
    </div>
  )
}
