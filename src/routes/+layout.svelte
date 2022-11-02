<script>
  import 'uno.css'
  import '../app.css'
  import '@unocss/reset/tailwind.css'
  import Footer from '../lib/Footer.svelte'
  import Header from '../lib/Header.svelte'
</script>

<main class="min-h-screen w-full flex flex-col">
  <Header />

  <slot />

  <Footer />
</main>
