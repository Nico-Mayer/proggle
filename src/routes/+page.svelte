<script>
  import { answers } from '../stores/answerstore'
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
    if (e.key === 'Enter') {
      console.log('enter ress')
    }
  }
</script>

<main
  class="flex justify-center items-center text-[#c6d0f5] flex-col pt-20 font-jetbrains space-y-8">
  <h1 class="text-7xl">Proggle</h1>
  <div class="flex flex-col relative ">
    <input
      class="h-12 w-80 bg-[#303446] px-4 py-2 border"
      type="text"
      placeholder="Type programming language..."
      on:focus={() => (isFocused = true)}
      on:blur={() => (isFocused = false)}
      on:keypress={handleEnter}
      bind:value={searchTerm} />
    {#if isFocused}
      <div
        class="absolute w-full flex flex-col top-12 max-h-52 overflow-scroll scrollbar-hide">
        {#each filteredAnswers as answer}
          <button
            class="p-2 flex items-center space-x-4 hover:bg-black"
            on:mousedown={() => (searchTerm = answer.name)}>
            <img src={answer.iconUrl} class="w-5" alt="icon" />
            <span>{answer.name}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>
