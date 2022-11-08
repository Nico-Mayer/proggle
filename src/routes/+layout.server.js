import {
  CORRECT_ANSWER_ENDPOINT,
  LAST_ANSWER_ENDPOINT,
} from '$env/static/private'

export const load = async ({ fetch }) => {
  const fetchCorrectAnswer = async () => {
    let correctAnswerRes = await fetch(CORRECT_ANSWER_ENDPOINT)
    let correctAnswerData = await correctAnswerRes.json()
    return correctAnswerData
  }
  const fetchLastAnswer = async () => {
    let lastAnswerRes = await fetch(LAST_ANSWER_ENDPOINT)
    let lastAnswerData = await lastAnswerRes.json()
    return lastAnswerData
  }

  return {
    correctAnswer: fetchCorrectAnswer(),
    lastAnswer: fetchLastAnswer(),
  }
}
