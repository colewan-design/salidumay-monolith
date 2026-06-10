<script setup>
import AppNavbar from '~/components/AppNavbar.vue'
import AppTopbar from '~/components/AppTopbar.vue'
</script>

<template>
  <AppNavbar />
  <AppTopbar />
  <div class="content-shell">
    <slot />
  </div>
</template>

<style>
.content-shell {
  margin-left: 220px;
  padding-top: 56px;
  min-height: 100vh;
}
@media (max-width: 768px) {
  .content-shell { margin-left: 0; }
}

body.theater-mode .sidebar,
body.theater-mode .topbar {
  display: none;
}
body.theater-mode .content-shell {
  margin-left: 0;
  padding-top: 0;
}
</style>
