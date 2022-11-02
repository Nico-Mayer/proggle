import { writable } from 'svelte/store'
import { PUBLIC_API_URL } from '$env/static/public'

export const answers = writable([])

const fetchAnswers = async () => {
  const res = await fetch(PUBLIC_API_URL)
  const data = await res.json()
  answers.set(data)
}

fetchAnswers()
