import { Review } from '@prisma/client'
import ReviewCard from './ReviewCard'

export default function Reviews({ reviews }: { reviews: Review[] }) {
  return (
    <div>
      <h1 className='font-bold text-3xl mt-10 mb-7 borber-b pb-5'>
        {reviews.length > 0 &&
          `What ${reviews.length} ${
            reviews.length === 1 ? 'person' : 'people'
          } are saying`}
      </h1>
      <div>
        <div className='border-b pb-7 mb-7 flex flex-col gap-10'>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
