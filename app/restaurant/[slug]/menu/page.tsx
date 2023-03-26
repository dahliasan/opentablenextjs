import RestaurantNavBar from '../components/RestaurantNavBar'
import Menu from '../components/Menu'
import type { Metadata } from 'next'
import type { ParsedUrlQuery } from 'querystring'

export async function generateMetadata({
  params,
}: {
  params: ParsedUrlQuery
}): Promise<Metadata> {
  return { title: params.slug + ' menu' }
}

export default function RestaurantMenu() {
  return (
    <div className='bg-white w-[100%] rounded p-3 shadow'>
      <RestaurantNavBar />
      <Menu />
    </div>
  )
}
