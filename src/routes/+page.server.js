import { ANSWERS_ENDPOINT } from '$env/static/private'

export const load = async ({ fetch }) => {
  const fetchAnswers = async () => {
    let answersRes = await fetch(ANSWERS_ENDPOINT)
    let answersData = await answersRes.json()
    return answersData
  }

  return {
    answers: fetchAnswers(),
  }
}
