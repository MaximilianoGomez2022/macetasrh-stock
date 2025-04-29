<template>
  <!-- Mostrar barra solo si NO estamos en /login -->
  <BarraLateral v-if="route.path !== '/login'" />

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import BarraLateral from './components/BarraLateral.vue'

const route = useRoute()
</script>

<style scoped></style>
