'use client'

import Link from 'next/link'
import AuthModal from './AuthModal'
import { useContext } from 'react'
import { AuthenticationContext } from '@/context/AuthContext'

function NavBar() {
  const { data } = useContext(AuthenticationContext)

  return (
    <nav className='bg-white p-2 flex justify-between dark:bg-black'>
      <Link
        href=''
        className='font-bold text-gray-700 dark:text-white text-2xl'
      >
        OpenTable
      </Link>
      <div>
        <div className='flex'>
          {data ? (
            <p>Welcome {data.firstName}</p>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
