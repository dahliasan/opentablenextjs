import Link from 'next/link'
import AuthModal from './AuthModal'

function NavBar() {
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
          <AuthModal isSignIn={true} />
          <AuthModal isSignIn={false} />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
