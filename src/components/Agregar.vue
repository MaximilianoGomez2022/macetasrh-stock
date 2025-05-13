<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const irANuevo = () => {
  router.push('/nuevo')
}
</script>

<template>
  <button v-on:click="irANuevo()">
    <p>+</p>
  </button>
</template>

<style scoped>
button {
  background-color: #00bd7e;
  color: white;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  font-size: 40px;
  text-align: center;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
p {
  color: white;
  margin-bottom: 2px;
}
</style>
