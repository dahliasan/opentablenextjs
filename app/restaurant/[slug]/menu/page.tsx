import RestaurantNavBar from '../components/RestaurantNavBar'
import Menu from '../components/Menu'
import type { Metadata } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      items: true,
    },
  })

  if (!restaurant) throw new Error('Restaurant not found')

  return restaurant
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const restaurant = await fetchItems(params.slug)
  return { title: restaurant.name }
}

export default async function RestaurantMenu({
  params,
}: {
  params: { slug: string }
}) {
  const restaurant = await fetchItems(params.slug)

  return (
    <div className='bg-white dark:bg-slate-700 w-[100%] rounded p-3 shadow'>
      <RestaurantNavBar slug={params.slug} />
      <Menu menu={restaurant.items} />
    </div>
  )
}
