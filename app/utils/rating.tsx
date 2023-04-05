import { Review } from '@prisma/client'
import { RestaurantCardType } from '../page'

// Find average rating
export const findAverageRating = (reviews: Review[]) => {
  if (!reviews.length) return 0
  const total = reviews.reduce((acc, review) => acc + review.rating, 0)
  // return to 1 decimal place, eg. 5 = 5.0
  return Number((total / reviews.length).toFixed(1))
}

// Convert rating to text
const ratingToText = (rating: number) => {
  if (rating < 1) return 'No reviews yet'
  if (rating < 2) return 'Terrible'
  if (rating < 3) return 'Bad'
  if (rating < 4) return 'Good'
  if (rating < 5) return 'Great'
  return 'Awesome'
}

// Convert rating to stars
const ratingToStars = (rating: number) => {
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<span key={i}>★</span>)
    } else {
      stars.push(<span key={i}>☆</span>)
    }
  }
  return stars
}

export const reviewsToStars = (reviews: Review[]) => {
  return ratingToStars(findAverageRating(reviews))
}

export const reviewsToText = (reviews: Review[]) => {
  return ratingToText(findAverageRating(reviews))
}
