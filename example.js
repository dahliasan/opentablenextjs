import { notFound } from 'next/navigation'

// some async fetch function
async function fetchExample() {
  const response = await fetch('/api/example')
  const data = await response.json()
  if (!data) {
    return notFound() // this will throw the default 404 page even though you have a not-found.js file
  }
  return data
}

export default function MyReactComponent() {
  const data = fetchExample()

  return <div>{/* render UI */}</div>
}


import { notFound } from 'next/navigation'

// some async fetch function
async function fetchExample() {
  const response = await fetch('/api/example')
  const data = await response.json()
  if (!data) {
    throw new Error('not found')
  }
  return data
}

export default function MyReactComponent() {


    try {
        const data = fetchExample()
    } catch (error) {
        if (error.message === 'not found') {
            return notFound()
        }
    }

  return <div>{/* render UI */}</div>
}
