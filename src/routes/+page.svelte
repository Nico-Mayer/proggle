<script>
  import { answers } from '../stores/answerstore'
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

<main class="flex items-center flex-col pt-20 space-y-8 min-h-screen">
  <h1 class="text-7xl font-sans font-bold text-white">Proggle</h1>
  <div class="flex flex-col relative w-screen items-center font-jetbrains">
    <input
      class="w-full md:w-1/2 bg-[#2D333B] p-5 rounded-xl shadow-xl h-16 outline-none placeholder:text-white/20 focus:rounded-t-xl focus:rounded-b-none transition-all caret-white/60"
      class:duration-700={isFocused}
      type="text"
      placeholder="Type programming language..."
      on:focus={() => (isFocused = true)}
      on:blur={() => (isFocused = false)}
      on:keypress={handleEnter}
      bind:value={searchTerm} />
    {#if isFocused}
      <div
        class="absolute w-1/2 flex flex-col top-16 max-h-64 overflow-scroll bg-[#2D333B] rounded-b-xl shadow-xl border-t border-white/10 px-5 py-2"
        transition:slide>
        {#each filteredAnswers as answer}
          <button
            class="border-white/5 flex items-center space-x-4 hover:bg-white/10 rounded-xl p-5"
            on:mousedown={() => (searchTerm = answer.name)}>
            <img src={answer.iconUrl} class="w-5" alt="icon" />
            <span>{answer.name}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>
