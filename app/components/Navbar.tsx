import { Disclosure, Transition } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Favorites', href: '#', current: false },
  { name: 'About Us', href: '/about', current: false }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="absolute top-[10px] left-1/2 transform -translate-x-1/2 
                 w-[70%] rounded-lg z-50 
                 bg-gradient-to-r from-gray-900/70 via-gray-800/60 to-gray-900/70 
                 backdrop-blur-md shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
              </svg>
            </div>
            <div className="hidden sm:flex space-x-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current ? 'text-white font-semibold' : 'text-gray-300 hover:text-white transition-colors duration-300',
                    'text-sm sm:text-base'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="sm:hidden">
              <Disclosure.Button className="text-gray-300 hover:text-white transition-colors duration-300">
                <span className="sr-only">Open menu</span>
                ☰
              </Disclosure.Button>
            </div>
          </div>
          <Transition
            show={open}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-200 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
          >
            <Disclosure.Panel className="sm:hidden bg-gradient-to-r from-gray-900/70 via-gray-800/60 to-gray-900/70 rounded-b-lg backdrop-blur-md shadow-inner">
              <div className="flex flex-col px-4 py-3 space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'text-white font-semibold' : 'text-gray-300 hover:text-white transition-colors duration-300',
                      'text-sm sm:text-base'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}
