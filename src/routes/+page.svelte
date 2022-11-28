<script>
  import Searchbox from '$lib/SearchBox.svelte'
  import { onMount } from 'svelte'
  export let data
  const { answers } = data

  let validAnswers = []
  let guessed = []

  onMount(() => {
    validAnswers = [...answers]
    let localGuesses = JSON.parse(localStorage.getItem('GUESSED'))
    guessed = localGuesses ? localGuesses : []

    for (let i = 0; i < guessed.length; i++) {
      let index = validAnswers.findIndex((el) => el.name == guessed[i].name)
      validAnswers.splice(index, 1)
    }
  })

  $: {
    validAnswers = validAnswers.filter((n) => !guessed.includes(n))
  }

  function handleSubmit(event) {
    guessed = [event.detail, ...guessed]
    localStorage.setItem('GUESSED', JSON.stringify(guessed))
  }
</script>

<main class="flex flex-col space-y-14 flex-1 pt-20 items-center">
  <div class="flex flex-col items-center">
    <h1 class="font-sans font-bold text-white mb-6 text-7xl md:text-8xl">
      Proggle
    </h1>
    <span class="font-mono text-lg text-white/60">New language every day!</span>
  </div>
  <Searchbox answers={validAnswers} on:submit={handleSubmit} />
  <div>
    {#each guessed as guess}
      {guess.name}
    {/each}
  </div>
</main>
