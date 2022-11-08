<script>
  import '../app.css'
  import '@unocss/reset/tailwind.css'
  import Footer from '../lib/Footer.svelte'
  import Header from '../lib/Header.svelte'

  export let data
  const { correctAnswer, lastAnswer } = data
</script>

<main class="flex flex-col min-h-screen w-full">
  <Header {correctAnswer} />
  <slot />
  <Footer {lastAnswer} />
</main>

<style uno:preflights uno:safelist global></style>
