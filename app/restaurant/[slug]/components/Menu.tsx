import { Item } from '@prisma/client'
import MenuCard from './MenuCard'

export default function Menu({ menu }: { menu: Item[] }) {
  return (
    <main className='bg-white dark:bg-slate-700 mt-5'>
      <div>
        <div className='mt-4 pb-1 mb-1'>
          <h1 className='font-bold text-4xl'>Menu</h1>
        </div>
        <div className='flex flex-wrap justify-between'>
          {menu.length > 0 ? (
            menu.map((item) => <MenuCard key={item.id} menuItem={item} />)
          ) : (
            <p>No menu items found</p>
          )}
        </div>
      </div>
    </main>
  )
}
