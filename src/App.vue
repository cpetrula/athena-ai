<script setup>
import AppHeader from './components/layout/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <AppHeader />
    <main class="min-h-[calc(100vh-80px)]">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Additional component-specific styles can go here */
</style>
