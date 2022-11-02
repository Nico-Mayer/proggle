import { writable } from 'svelte/store'

export const answers = writable([])

const fetchAnswers = async () => {
  const url = 'https://progglebackend-production.up.railway.app/answers'
  const res = await fetch(url)
  const data = await res.json()
  answers.set(data)
}

fetchAnswers()
