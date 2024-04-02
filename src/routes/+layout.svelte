<script>
	import '../app.pcss';

  // import '@material/web/fab/fab.js';
  // import '@material/web/icon/icon.js';
  import '@material/web/all.js';

  import '$lib/css/light.css';
  import '$lib/css/dark.css';

  let darkMode = false;
  let form;
</script>

<div class={(darkMode ? 'dark' : 'light') + " flex flex-row"}>
  <div class="flex flex-col justify-between h-screen w-24 bg-[color:var(--md-sys-color-surface-container)]">
    <div class="flex w-full mt-5">
      <!-- <form bind:this={form} method="POST" action="?/" class="flex flex-col w-full">
      <md-fab on:click={() => {form.submit()}} class="mx-auto" aria-label="Edit">
        <md-icon slot="icon">edit</md-icon>
      </md-fab>
      <input class="absolute mt-16" name="date" type="date" />
      <input class="absolute mt-24" name="img" type="file"/>
      </form> -->
    </div>
    <div class="flex w-full mb-5">
      <md-switch on:change={(e) => {darkMode = !darkMode}} class="mx-auto"></md-switch>
    </div>
  </div>
  <div class="w-full bg-[color:var(--md-sys-color-surface)] p-6">
    <slot />
  </div>
</div>
