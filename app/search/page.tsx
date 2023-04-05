import RestaurantCard from './components/RestaurantCard'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import { PRICE, PrismaClient } from '@prisma/client'
import { RestaurantCardType, fetchRestaurants } from '../page'

export interface SearchQuery {
  city?: string
  cuisine?: string
  price?: PRICE
}

// fetch restaurants from the database based on location
const prisma = new PrismaClient()

const fetchRestaurantsByQuery = async (
  query: SearchQuery
): Promise<RestaurantCardType[]> => {
  const { city, cuisine, price } = query

  if (!city) return fetchRestaurants()

  const restaurants = await prisma.restaurant.findMany({
    where: {
      location: {
        name: {
          equals: city?.toLowerCase(),
        },
      },
      cuisine: {
        name: {
          equals: cuisine?.toLowerCase(),
        },
      },
      price: {
        equals: price,
      },
    },
    select: {
      id: true,
      name: true,
      location: true,
      cuisine: true,
      main_image: true,
      price: true,
      slug: true,
      reviews: true,
    },
  })

  return restaurants
}

const fetchCusines = async () => {
  return prisma.cuisine.findMany()
}

const fetchLocations = async () => {
  return prisma.location.findMany()
}

export const metadata = {
  title: 'Search',
}

export default async function Search({
  searchParams,
}: {
  searchParams: SearchQuery
}) {
  const restaurants = await fetchRestaurantsByQuery(searchParams)
  const cusines = await fetchCusines()
  const locations = await fetchLocations()

  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSideBar cusines={cusines} locations={locations} />
        <div className='w-5/6 ml-8'>
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.name} restaurant={restaurant} />
            ))
          ) : (
            <p>No restaurants found</p>
          )}
        </div>
      </div>
    </>
  )
}
