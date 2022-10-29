<script>
  import { answers } from '../stores/answerstore'
  let searchTerm = ''
  let filteredAnswers = []

  $: {
    if (searchTerm) {
      filteredAnswers = $answers.filter((answer) =>
        answer.name.toLowerCase().startsWith(searchTerm.toLocaleLowerCase())
      )
    } else {
      filteredAnswers = [...$answers]
    }
  }
</script>

<main
  class="flex justify-center items-center text-[#c6d0f5] flex-col pt-20 font-jetbrains space-y-8">
  <h1 class="text-7xl">PROGGLE</h1>
  <div class="flex flex-col relative ">
    <input
      class="h-8"
      type="text"
      placeholder="Search"
      bind:value={searchTerm} />
    <div
      class="absolute w-full flex flex-col top-8 max-h-52 overflow-scroll scrollbar-hide">
      {#each filteredAnswers as answer}
        <button
          class="p-2 flex items-center space-x-4"
          on:click={() => (searchTerm = answer.name)}>
          <img src={answer.iconUrl} class="w-5" alt="icon" />
          <span>{answer.name}</span>
        </button>
      {/each}
    </div>
  </div>
</main>
