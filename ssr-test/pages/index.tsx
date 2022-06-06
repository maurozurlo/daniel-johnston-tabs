import Head from 'next/head'
import Image from 'next/image'
import cover from '../public/cover.jpg'

export default function Index() {
  return (
    <>
      <Head>
        <title>Daniel Johnston Tab Project</title>
      </Head>

        <div style={{ maxWidth: 512, margin: '0 auto' }}>
          <Image src={cover} alt="Daniel Johnston Art" layout="intrinsic" />
        </div>
        <div>
          <h1 className="text-lg text-slate-800 font-bold py-4">
            Hi, how are you?
          </h1>
          <p>
            This fan website is currently under construction. In the meantime,
            feel free to look around.
          </p>
          <p>-Miauz</p>
        </div>
    </>
  )
}
