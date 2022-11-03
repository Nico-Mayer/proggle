<script>
  import { slide } from 'svelte/transition'

  export let data
  const { answers } = data

  let playShake = false
  let isFocused = false
  let answerBox
  let inputField
  let searchTerm = ''
  let filteredAnswers = []
  let highlightIndex = 0

  $: {
    if (searchTerm) {
      filteredAnswers = answers
        .filter((answer) =>
          answer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))

      highlightIndex = 0
    } else {
      filteredAnswers = [...answers]
      highlightIndex = 0
    }
  }

  function handleEnter(e) {
    // Todo handle all cases when enter is pressed on focus
    if (e.key === 'Enter' && filteredAnswers.length > 0 && isFocused) {
      let highlightBtnText = document.querySelector(
        '#btnIndex' + highlightIndex
      ).childNodes[2].innerHTML

      if (searchTerm.toLowerCase() === filteredAnswers[0].name.toLowerCase()) {
        // Anwort abschicken
        inputField.blur()
        console.log('Abschicken')
      }
      searchTerm = highlightBtnText
    } else if (e.key === 'Enter' && filteredAnswers.length <= 0 && isFocused) {
      playShake = true
      setTimeout(() => (playShake = false), 820)
    }
  }

  const isItIn = function (parent, child) {
    let parentBounds = parent.getBoundingClientRect()
    let childBounds = child.getBoundingClientRect()

    if (
      childBounds.top < parentBounds.top ||
      childBounds.right > parentBounds.right ||
      childBounds.bottom > parentBounds.bottom ||
      childBounds.left < parentBounds.left
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

<main class="flex flex-col space-y-14 flex-1 pt-20 items-center">
  <div class="flex flex-col items-center">
    <h1 class="font-sans font-bold text-white mb-6 text-7xl md:text-8xl">
      Proggle
    </h1>
    <span class="font-mono text-lg text-white/60">New language every day!</span>
  </div>

  <div class="flex flex-col font-mono w-[90%] relative items-center md:w-1/2">
    <input
      class="rounded-xl outline-none bg-[#2D333B] h-16 shadow-xl text-white w-full p-5 transition-all duration-500 placeholder:text-white/20 caret-white/60 focus:(rounded-b-none)"
      type="text"
      placeholder="Type programming language..."
      class:apply-shake={playShake}
      on:focus={() => (isFocused = true)}
      on:blur={() => {
        highlightIndex = 0
        isFocused = false
      }}
      on:keypress={handleEnter}
      bind:this={inputField}
      bind:value={searchTerm} />
    {#if isFocused && filteredAnswers.length > 0}
      <div
        class="border-t rounded-b-xl flex flex-col bg-[#2D333B] border-white/10 shadow-xl w-full max-h-80 transition-all top-16 duration-500 absolute overflow-y-scroll scrollbar-hide"
        bind:this={answerBox}
        transition:slide>
        {#each filteredAnswers as answer, index}
          <button
            class="flex space-x-4 border-6 border-[#2D333B] rounded-2xl h-18 p-5 text-white/60 items-center hover:(bg-white/10 text-white) "
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

<style>
  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  .apply-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
</style>
