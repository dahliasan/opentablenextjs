import { RestaurantCardType } from '@/app/page'
import Price from '@/app/components/Price'
import Link from 'next/link'
import { reviewsToStars, reviewsToText } from '@/app/utils/rating'

function RestaurantCard({ restaurant }: { restaurant: RestaurantCardType }) {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className='border-b flex pb-5'>
        <img src={restaurant.main_image} alt='' className='w-44 rounded' />
        <div className='pl-5'>
          <h2 className='text-3xl'>{restaurant.name}</h2>
          <div className='flex items-center gap-2 mb-2'>
            <div className='flex'>{reviewsToStars(restaurant.reviews)}</div>
            <div className='text-sm tracking-wide'>
              {reviewsToText(restaurant.reviews)}
            </div>
          </div>
          <div className='mb-9'>
            <div className='font-light flex text-reg'>
              <p className='mr-4'>
                <Price price={restaurant.price} />
              </p>
              <p className='mr-4 capitalize'>{restaurant.cuisine.name}</p>
              <p className='mr-4 capitalize'>{restaurant.location.name}</p>
            </div>
          </div>
          <div className='text-red-600'>
            <Link href={`/restaurant/${restaurant.name}`}>
              View more information
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
