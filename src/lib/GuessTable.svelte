<script>
  export let guesses
</script>

{#if guesses.length > 0}
  <table
    class="border-separate font-mono [border-spacing:1rem] text-white text-xs table-fixed">
    <tr>
      <th>Language</th>
      <th>Typesystem</th>
      <th>Paradigm</th>
      <th>Usecases</th>
      <th>Level</th>
      <th>Released</th>
    </tr>
    {#each guesses as guess}
      <tr>
        <td class="col">
          <img src={guess.iconUrl} alt="icon" class="m-auto w-10 block" />
          <span class="text-xs text-white/40">{guess.name}</span>
        </td>
        <td class="col">
          <span>{guess.typesystem}</span>
        </td>
        <td class="col">
          {#each guess.paradigm as paradigm}
            <span>{paradigm}</span><br />
          {/each}
        </td>
        <td class="col">
          {#each guess.usecase as usecase}
            <span>{usecase}</span><br />
          {/each}
        </td>
        <td class="col">
          <span>{guess.level}</span>
        </td>
        <td class="col">
          <span>{guess.releaseDate}</span>
        </td>
      </tr>
    {/each}
  </table>
{/if}

<style>
  .col {
    @apply w-28;
    @apply h-28;
    @apply p-4;
    @apply rounded-xl;
    @apply border;
    @apply border-white/10;
    text-align: center;
    align-content: center;
    background-color: #20242a;
  }
</style>
