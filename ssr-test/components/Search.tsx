import React, { useRef, useState, Fragment, MutableRefObject } from 'react'
import { useRouter } from 'next/router'
import { TSearch } from '../types'
import data from '../public/songs-albums.json'

interface TSearchResult extends TSearch {
  substrings: string[]
}

export default function Search() {
  const searchInput = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<TSearchResult[]>([])
  const router = useRouter()

  const handleSearchInputChange = () => {
    if(!searchInput.current?.value) {
      setSearchResults([])
      return;
    }
    const searchStr = searchInput.current.value ?? ""
    setSearchResults(
      data
      .filter((item) => item.name.toLowerCase().includes(searchStr.toLowerCase()))
      .map((item) => {
        const title = item.name
        const substrings = title.split(new RegExp(`(${searchStr})`, 'i'))
        return {
          ...item,
          substrings,
        }
      })
      .slice(0, 5)
    )
  }

  const handleSearchFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    if (searchResults.length > 0) {
      goToPage(searchResults[0])
    }
  }

  const goToPage = (searchResult: TSearchResult) => {
    if (searchResult.type === "album") {
      router.push(`/albums/${searchResult.permalink}`)
    } else {
      router.push(`/songs/${searchResult.permalink}`)
    }
    setSearchResults([])
    if(searchInput.current)
    searchInput.current.value = ""
  }

  return (
    <form onSubmit={handleSearchFormSubmit} className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          className="bg-white-100 border border-slate-100 text-gray-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full pl-10 p-2.5"
          type="text"
          placeholder="Search"
          required
          ref={searchInput}
          onChange={handleSearchInputChange}
        />
        {searchResults.length ? 
        <div className="absolute mt-2 w-full overflow-hidden rounded-md bg-white border border-slate-300 z-10">
          {searchResults.map((result) => (
            <div
              key={result.permalink}
              className="cursor-pointer py-2 px-3 hover:bg-slate-100"
              onClick={() => goToPage(result)}
            >
              {result?.substrings.map((substring, index) => (
                <Fragment key={`${result.permalink}-${index}`}>
                  {substring.toLowerCase() === searchInput.current?.value.toLowerCase() ? (
                    <span className="text-sm font-medium text-gray-600">
                      {substring}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600">{substring}</span>
                  )}
                </Fragment>
              ))}
              <span className="text-sm text-gray-600 capitalize"> - {result.type}</span>
            </div>
          ))}
        </div>
        : null
        }
      </div>
      <button
        type="submit"
        className="p-2.5 ml-2 text-sm font-medium text-white bg-slate-700 rounded-lg border border-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </form>
  )
}
