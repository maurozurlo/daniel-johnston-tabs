import Head from 'next/head'
import Image from 'next/image'
import cover from '../public/cover.jpg'

export default function Index() {
  return (
    <>
      <Head>
        <title>Daniel Johnston Tab Project</title>
      </Head>
        <section>
          <article className="flex flex-col">
            <Image src={cover} alt="Daniel Johnston Art" layout="intrinsic" />
            <div className="bg-white flex flex-col justify-start pb-6">
              <h1
                className="text-3xl font-bold pb-4"
              >
                Hi, how are you?
              </h1>
              <p className="text-sm pb-3">
                By{' '}
                <a href="https://maurozurlo.com" className="font-semibold hover:text-gray-800">
                  El Miauro
                </a>
                , Last Updated on Jan 3rd, 2023
              </p>
              
              <p>
                This fan website is currently under construction.
              </p>
              <p>
                In the meantime, feel free to look around.
                </p>
            </div>
          </article>
        </section>
    </>
  )
}
