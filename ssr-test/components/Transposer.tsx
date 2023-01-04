import React from 'react'
import { keys } from '../utils/music'
import { getChordRootAndType } from '../utils/transpose'
import { TKey } from '../types'

const commonClasses =
  'block float-left text-center mx-1 my-1 text-decoration-none py-2 border-transparent outline-none rounded-md '
const unSelected = 'text-gray-800 bg-slate-100'
const selected = 'bg-pink-700 text-white font-bold'

const Transposer: React.VFC<{
  songKey: string
  transposeSong: (key: string) => void
}> = ({ songKey, transposeSong }) => {
  
  return (
    <div className="overflow-auto mx-auto flex align-middle justify-center">
      {keys
      //.filter(v => keys[keys.findIndex(t => t.value === v.value)].name === v.name)
      .map((value) => {
        return (
          <button
            onClick={(e) => {
              e.preventDefault()
              transposeSong(value.name)
              return false
            }}
            key={value.name}
            style={{ width: '2em' }}
            className={commonClasses.concat(
              value.name === songKey ? selected : unSelected
            )}
          >
            {value.name}
          </button>
        )
      })}
    </div>
  )
}

export default Transposer
