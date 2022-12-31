import '../styles/globals.css'
import Nav from '../components/Nav'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <div className="max-w-2xl mx-auto py-4 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
