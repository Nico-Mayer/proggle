import { PUBLIC_API_URL } from '$env/static/public'

export const load = async ({ fetch }) => {
  const answersRes = await fetch(PUBLIC_API_URL)
  const answersData = await answersRes.json()
  return { answers: answersData }
}
