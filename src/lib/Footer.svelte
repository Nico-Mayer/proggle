<script>
  export let lastAnswer
</script>

<main class="flex flex-col space-y-4 text-center justify-center">
  <p class="font-mono text-white/80">
    Yesterdays Answer:&ensp
    <span class="text-blue-400">{lastAnswer.name}</span>
  </p>
  <section
    class="flex space-x-6 h-16 pb-8 text-white/40 justify-center items-center">
    <div class="text-3xl i-simple-icons-github" />
    <div class="text-3xl i-simple-icons-buymeacoffee" />
    <div class="text-3xl i-simple-icons-googlemessages" />
  </section>
</main>
