import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '../utils/style'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'
import Logo from '../public/brand.svg'
import Search from './Search'

const sections = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'About',
    link: '/about',
  },
  {
    name: 'Albums',
    link: '/albums',
  },
  {
    name: 'Sign In',
    link: '/sign-in',
    requireLogin: true
  },
  {
    name: 'Add Tab',
    link: '/add-tab',
    requireLogin: true,
  },
]

const Links = () => {
  const router = useRouter()
  return (
    <>
      {sections.map((section) => {
        return section.requireLogin ? null : (
          <Link href={section.link} key={section.link}>
            <a
              className={cn(
                'hover:bg-slate-200 text-slate-900 px-3 py-2 rounded-md text-sm',
                router.pathname == section.link ? 'font-medium' : ''
              )}
            >
              {section.name}
            </a>
          </Link>
        )
      })}
    </>
  )
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around h-16">
        <Image src={Logo} width={120} height={80} layout="intrinsic" />
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Links />
              </div>
            </div>
          </div>

          <Search />
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-300 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-slate-100 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-slate-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div
              ref={ref}
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col"
            >
              <Links />
            </div>
          </div>
        )}
      </Transition>
    </nav>
  )
}

export default Nav
