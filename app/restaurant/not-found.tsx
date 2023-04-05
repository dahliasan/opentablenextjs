import Image from 'next/image'
import errorMascot from '../../public/icons/error.png'

export default function NotFound() {
  return (
    <div className='h-screen bg-gray-200 flex flex-col justify-center items-center gap-8'>
      <Image src={errorMascot} alt='error' className='w-56 ' />
      <div className='bg-white dark:bg-slate-800 px-10 py-6 shadow rounded'>
        <h3 className='text-xl font-bold'>Well, this is embarrassing.</h3>
        <p className='mt-4'>We couldn't find that restaurant.</p>
        <p className='mt-4 text-xs'>Error code: 404</p>
      </div>
    </div>
  )
}
