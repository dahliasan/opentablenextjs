import { reviewsToStars } from '@/app/utils/rating'
import { Review } from '@prisma/client'

// fetch users from user_id
export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className='flex items-center gap-10'>
      <div className='w-1/6 flex flex-col items-center'>
        <div className='rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center'>
          <h2 className='text-white text-2xl'>
            {review.first_name[0] + review.last_name[0]}
          </h2>
        </div>
        <p className='text-center'>{`${review.first_name} ${review.last_name}`}</p>
      </div>
      <div className='w-5/6'>
        <div className='flex items-center'>
          <div className='flex mr-5'>{reviewsToStars([review])}</div>
        </div>
        <p className='text-lg font-light'>{review.text}</p>
      </div>
    </div>
  )
}
