import { writable } from 'svelte/store'

export const answers = writable([])

const fetchAnswers = async () => {
  const url = 'https://proggle-backend.onrender.com/answers'
  const res = await fetch(url)
  const data = await res.json()
  answers.set(data)
}

fetchAnswers()
