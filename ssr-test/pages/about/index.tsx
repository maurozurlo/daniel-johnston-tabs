import React from 'react'

type Props = {}

export default function index({}: Props) {
  return (
    <div className="container mx-auto flex flex-wrap py-6">
    <section className="w-full md:w-4/6 flex flex-col items-center px-3 mx-auto" >
      <article className="flex flex-col my-4">
        <div className="bg-white flex flex-col justify-start p-6">
          <h1
            className="text-3xl font-bold pb-4"
          >
            About
          </h1>
          <p className="text-sm pb-3">
            By{' '}
            <a href="#" className="font-semibold hover:text-gray-800">
              El Miauro
            </a>
            , Last Updated on June 10th, 2022
          </p>
          <p className="pb-6">
          Daniel's catalog is incredibly vast, I just wanted to provide a pretty platform to share tabs for as many of his songs as I can get.
          </p>
          {/*<a href="#" class="uppercase text-gray-800 hover:text-black">Continue Reading <i class="fas fa-arrow-right"></i></a>*/}
        </div>
      </article>
    </section>
    </div>
  )
}
