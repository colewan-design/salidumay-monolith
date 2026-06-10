<script setup>
// Full-screen layout for FilmWatchPage — no navbar, no topbar, no shell margins.
// Body scroll is locked while this layout is active.
onMounted(() => { document.body.style.overflow = 'hidden' })
onUnmounted(() => { document.body.style.overflow = '' })
</script>

<template>
  <slot />
</template>
