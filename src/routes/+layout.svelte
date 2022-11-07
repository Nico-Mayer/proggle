<script>
  import '../app.css'
  import '@unocss/reset/tailwind.css'
  import Footer from '../lib/Footer.svelte'
  import Header from '../lib/Header.svelte'
</script>

<main class="flex flex-col min-h-screen w-full">
  <Header />
  <slot />
  <Footer />
</main>

<style uno:preflights uno:safelist global></style>
