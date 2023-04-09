// import styles from './page.module.css'
import { PrismaClient, Cuisine, PRICE, Location, Review } from '@prisma/client'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'

export interface RestaurantCardType {
  id: number
  name: string
  main_image: string
  location: Location
  price: PRICE
  cuisine: Cuisine
  slug: string
  reviews: Review[]
}

const prisma = new PrismaClient()

export const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      location: true,
      price: true,
      cuisine: true,
      slug: true,
      reviews: true,
    },
  })

  // Disconnect from the database
  await prisma.$disconnect()

  return restaurants
}

export default async function Home() {
  const restaurants = await fetchRestaurants()

  return (
    <main>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  )
}
