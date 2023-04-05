import RestaurantNavBar from './components/RestaurantNavBar'
import Title from './components/Title'
import Rating from './components/Rating'
import Description from './components/Description'
import Images from './components/Images'
import Reviews from './components/Reviews'
import ReservationCard from './components/ReservationCard'
import { PrismaClient, Review } from '@prisma/client'
import { Metadata } from 'next/types'
import { notFound } from 'next/navigation'

interface Restaurant {
  id: number
  name: string
  images: string[]
  description: string
  slug: string
  reviews: Review[]
}

const prisma = new PrismaClient()

export const fetchRestaurantsBySlug = async (
  slug: string
): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
    },
  })

  if (!restaurant) {
    throw new Error('Restaurant not found')
  }

  return restaurant
}

export default async function RestaurantDetails({
  params,
}: {
  params: { slug: string }
}) {
  let restaurant
  try {
    restaurant = await fetchRestaurantsBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <>
      <div className='bg-white dark:bg-slate-700 w-[70%] rounded p-3 shadow'>
        <RestaurantNavBar slug={restaurant.slug} />
        <Title name={restaurant.name} />
        <Rating reviews={restaurant.reviews} />
        <Description description={restaurant.description} />
        <Images images={restaurant.images} />
        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className='w-[27%] relative text-reg'>
        <ReservationCard />
      </div>
    </>
  )
}
