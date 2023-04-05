'use client'

import Image from 'next/image'
import errorMascot from '../public/icons/error.png'

export default function Error({ error }: { error: Error }) {
  console.log(error)
  return (
    <div className='h-screen bg-gray-200 flex flex-col justify-center items-center gap-8'>
      <Image src={errorMascot} alt='error' className='w-56 ' />
      <div className='bg-white dark:bg-slate-800 px-10 py-6 shadow rounded'>
        <h3 className='text-xl font-bold'>Well, this is embarrassing.</h3>
        <p className='mt-4'>An error occured with the following message:</p>
        <p className='text-reg font-bold'>{error.message}</p>
        <p className='mt-4 text-xs'>Error code: 400</p>
      </div>
    </div>
  )
}
