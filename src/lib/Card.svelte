<script lang="ts">
  export let img = undefined;
  export let title = "";
</script>

<div class="flex flex-col bg-[color:var(--md-sys-color-surface-container)] text-[color:var(--md-sys-color-on-surface)] rounded-3xl w-96 overflow-hidden">
  {#if img != undefined}
  <img src={img} class="object-cover overflow-hidden"/>
  {/if}
  <div class="p-6 flex flex-col gap-2">
    <h1 class="text-2xl font-medium">{title}</h1>
    <slot/>
  </div>
</div>
