<template>
  <app-navbar></app-navbar>

  <router-view />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from '@/components/AppNavbar.vue'

</script>

<style scoped></style>