<script>
  import { answers } from '$lib/stores/answerstore'
  import { slide } from 'svelte/transition'

  let isFocused = false
  let answerBox
  let searchTerm = ''
  let filteredAnswers = []
  let highlightIndex = 0

  $: {
    if (searchTerm) {
      filteredAnswers = $answers.filter((answer) =>
        answer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      highlightIndex = 0
    } else {
      filteredAnswers = [...$answers]
      highlightIndex = 0
    }
  }

  function handleEnter(e) {
    // Todo handle all cases when enter is pressed on focus
    if (e.key === 'Enter') {
      searchTerm = document.querySelector('#btnIndex' + highlightIndex)
        .childNodes[2].innerHTML
    }
  }

  var isItIn = function (parent, child) {
    var box1coords = parent.getBoundingClientRect()
    var box2coords = child.getBoundingClientRect()

    if (
      box2coords.top < box1coords.top ||
      box2coords.right > box1coords.right ||
      box2coords.bottom > box1coords.bottom ||
      box2coords.left < box1coords.left
    ) {
      return false
    }
    return true
  }

  function handleArrowKeys(e) {
    if (isFocused && filteredAnswers.length > 0) {
      switch (e.key) {
        case 'ArrowUp':
          if (highlightIndex > 0) {
            highlightIndex -= 1
          }
          break
        case 'ArrowDown':
          if (highlightIndex < filteredAnswers.length - 1) {
            highlightIndex += 1
          }
          break
      }
      let highlightedBtn = document.querySelector('#btnIndex' + highlightIndex)
      if (!isItIn(answerBox, highlightedBtn)) {
        highlightedBtn.scrollIntoView()
      }
    }
  }
</script>

<svelte:window on:keydown={handleArrowKeys} />

<main class="flex flex-col space-y-22 flex-1 pt-20 items-center">
  <h1 class="font-sans font-bold text-white text-6xl md:text-7xl">Proggle</h1>
  <div class="flex flex-col font-mono w-[90%] relative items-center md:w-1/2">
    <input
      class="rounded-xl outline-none bg-[#2D333B] h-16 shadow-xl text-white w-full p-5 transition-all duration-500 placeholder:text-white/20 caret-white/60 focus:(rounded-b-none)"
      type="text"
      placeholder="Type programming language..."
      on:focus={() => (isFocused = true)}
      on:blur={() => {
        highlightIndex = 0
        isFocused = false
      }}
      on:keypress={handleEnter}
      bind:value={searchTerm} />
    {#if isFocused}
      <div
        class="border-t rounded-b-xl flex flex-col space-y-2 bg-[#2D333B] border-white/10 shadow-xl w-full max-h-80 transition-all top-16 duration-500 absolute overflow-y-scroll scrollbar-hide"
        bind:this={answerBox}
        transition:slide>
        {#each filteredAnswers as answer, index}
          <button
            class="rounded-xl flex space-x-4 h-14 p-5 text-white/60 items-center hover:(bg-white/10 text-white) "
            class:bg-gray-700={index === highlightIndex}
            id={'btnIndex' + index}
            on:mousedown={() => (searchTerm = answer.name)}>
            <img src={answer.iconUrl} class="w-5" alt="icon" />
            <span>{answer.name}</span>
          </button>
        {/each}
      </div>
    {/if}
  </div>
</main>
