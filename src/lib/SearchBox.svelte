<script>
  import { slide, fade } from 'svelte/transition'
  import isItIn from '$lib/utils/isItIn.js'
  import { createEventDispatcher } from 'svelte'
  export let answers

  const dispatch = createEventDispatcher()

  let playShake = false
  let isFocused = false
  let answerBox
  let inputField
  let searchTerm = ''
  let highlightIndex = 0
  let filteredAnswers = []
  let dispatchable = false

  $: {
    let validInput = filteredAnswers.find((el) => {
      return el.name.toLowerCase() === searchTerm.toLowerCase()
    })

    if (searchTerm && filteredAnswers.length > 0) {
      if (
        validInput ||
        (searchTerm.toLowerCase() === filteredAnswers[0].name.toLowerCase() &&
          filteredAnswers.length >= 1)
      ) {
        dispatchable = true
      } else {
        dispatchable = false
      }
    } else dispatchable = false
  }

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

  function dispatchSubmit() {
    if (dispatchable) {
      if (highlightIndex) {
        dispatch('submit', filteredAnswers[highlightIndex])
      } else dispatch('submit', filteredAnswers[0])

      inputField.blur()
      searchTerm = ''

      console.log(
        'Abschicken ID:' +
          filteredAnswers[0]._id +
          ' Name: ' +
          filteredAnswers[0].name
      )
    }
  }

  function handleEnter(e) {
    // Todo handle all cases when enter is pressed on focus
    if (e.key === 'Enter' && filteredAnswers.length > 0 && isFocused) {
      let highlightBtnText = document.querySelector(
        '#btnIndex' + highlightIndex
      ).childNodes[2].innerHTML
      searchTerm = highlightBtnText
      dispatchSubmit()
    } else if (e.key === 'Enter' && filteredAnswers.length <= 0 && isFocused) {
      playShake = true
      setTimeout(() => (playShake = false), 820)
    }
  }

  function handleClick() {
    if (dispatchable) {
      dispatchSubmit()
    }
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
        highlightedBtn.scrollIntoView(false)
      }
    }
  }
</script>

<svelte:window on:keydown={handleArrowKeys} />

<div class="flex flex-col font-mono w-[90%] items-center relative md:w-1/2">
  <section class="flex space-x-4 w-full">
    <input
      class="rounded-xl outline-none bg-[#2D333B] h-16 shadow-xl w-full p-5 placeholder:text-white/20 caret-white/60"
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
    <button
      class="rounded-xl bg-[#2D333B] shadow-xl py-5 px-12"
      class:bg-green-500={dispatchable}
      on:click={handleClick}>
      Try</button>
  </section>

  {#if isFocused && filteredAnswers.length > 0}
    <div
      class="rounded-xl flex flex-col bg-[#2D333B] shadow-xl mt-4 w-full max-h-80 top-16 overflow-y-scroll scrollbar-hide  absolute"
      bind:this={answerBox}
      in:slide
      out:fade={{ delay: 10, duration: 150 }}>
      {#each filteredAnswers as answer, index}
        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
        <button
          class="flex space-x-6 border-6 border-[#2D333B] rounded-2xl h-18 p-5 text-white/60 items-center group hover:text-white"
          class:highlightedBtn={index === highlightIndex}
          id={'btnIndex' + index}
          on:mousedown={() => (searchTerm = answer.name)}>
          <img
            src={answer.iconUrl}
            class="opacity-60 w-5 group-hover:opacity-100"
            class:hundertop={index === highlightIndex}
            alt="icon" />
          <span>{answer.name}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>

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
  .hundertop {
    opacity: 100;
  }

  .apply-shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  .highlightedBtn {
    background-color: rgba(0, 0, 0, 0.05);
    color: white;
  }
</style>
