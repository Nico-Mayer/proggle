<script>
  import { answers } from '$lib/stores/answerstore'
  import { slide } from 'svelte/transition'

  let isFocused = false
  let searchTerm = ''
  let filteredAnswers = []

  $: {
    if (searchTerm) {
      filteredAnswers = $answers.filter((answer) =>
        answer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    } else {
      filteredAnswers = [...$answers]
    }
  }

  function handleEnter(e) {
    // Todo handle all cases when enter is pressed on focus
    if (e.key === 'Enter') {
      console.log('enter ress')
    }
  }
</script>

<main class="flex flex-1 items-center flex-col space-y-22 pt-20">
  <h1 class="text-6xl md:text-7xl font-sans font-bold text-white">Proggle</h1>
  <div class="flex flex-col relative w-screen items-center font-mono">
    <input
      class="w-[90%] md:w-1/2 bg-[#2D333B] p-5 rounded-xl shadow-xl h-16 outline-none placeholder:text-white/20 focus:(rounded-b-none) caret-white/60 transition-all duration-500"
      type="text"
      placeholder="Type programming language..."
      on:focus={() => (isFocused = true)}
      on:blur={() => (isFocused = false)}
      on:keypress={handleEnter}
      bind:value={searchTerm} />
    {#if isFocused}
      <div
        class="absolute w-[90%] md:w-1/2 flex flex-col top-16 max-h-64 overflow-y-scroll bg-[#2D333B] shadow-xl border-t border-white/10 px-5 py-2 transition-all duration-500 rounded-b-xl"
        transition:slide>
        {#each filteredAnswers as answer}
          <button
            class="flex text-white/60 items-center space-x-4 hover:(bg-white/10 text-white) rounded-xl p-5"
            on:mousedown={() => (searchTerm = answer.name)}>
            <img src={answer.iconUrl} class="w-5" alt="icon" />
            <span>{answer.name}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>
