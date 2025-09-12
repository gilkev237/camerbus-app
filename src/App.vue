<template>
  <div id="app" class="min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
