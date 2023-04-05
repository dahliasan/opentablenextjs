'use client'

import { Cuisine, Location, PRICE } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const prices = [
  { label: '$', price: PRICE.CHEAP },
  { label: '$$', price: PRICE.REGULAR },
  { label: '$$$', price: PRICE.EXPENSIVE },
]

function SearchSideBar({
  cusines,
  locations,
}: {
  cusines: Cuisine[]
  locations: Location[]
}) {
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: `/search`,
              query: { ...query, city: location.name },
            }}
            key={location.id}
            className='font-light text-reg capitalize'
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {cusines.map((cuisine) => (
          <Link
            href={{
              pathname: `/search`,
              query: { ...query, cuisine: cuisine.name },
            }}
            key={cuisine.id}
            className='font-light text-reg capitalize'
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex gap-1'>
          {prices.map((price) => (
            <Link
              href={{
                pathname: '/search',
                query: { ...query, price: price.price },
              }}
              className='border w-full text-reg font-light p-1 rounded-md text-center'
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchSideBar
