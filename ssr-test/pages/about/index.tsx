import React from 'react'

type Props = {}

export default function index({}: Props) {
  return (
      <section>
        <article className="flex flex-col">
          <div className="bg-white flex flex-col justify-start pb-6">
            <h1 className="text-3xl font-bold pb-4">About</h1>
            <p className="text-sm pb-3">
              By{' '}
              <a
                href="https://maurozurlo.com"
                className="font-semibold hover:text-gray-800"
              >
                El Miauro
              </a>
              , Last Updated on Jan 3rd, 2023
            </p>
            <p>
              Daniel's catalog is incredibly vast, I just wanted to provide a platform to share tabs for as many of his songs as I can
              get.
            </p>
            <p>This was also just an excuse to learn Next.JS and Tailwind, so much for side projects</p>
          </div>
        </article>
      </section>
  )
}
