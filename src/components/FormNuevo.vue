<template>
  <h1>CREAR PRODUCTO</h1>
  <div v-if="guardando">Guardando…</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <form @submit.prevent="onSubmit">
      <label> CC: </label>
      <input type="text" v-model="cc" required />

      <label> Cemento: </label>
      <input type="number" v-model.number="cemento" min="0" required />

      <label> Pintado: </label>
      <input type="number" v-model.number="pintado" min="0" required />

      <label> Imper: </label>
      <input type="number" v-model.number="imper" min="0" required />

      <label> Stock: </label>
      <input type="number" v-model.number="stock" min="0" required />

      <label> Alto: </label>
      <input type="number" v-model.number="alto" min="0" required />

      <label> Base: </label>
      <input type="number" v-model.number="base" min="0" required />

      <label> Boca: </label>
      <input type="number" v-model.number="boca" min="0" required />

      <label> Color: </label>
      <input type="text" v-model="color" />

      <button type="submit" :disabled="guardando">
        {{ guardando ? 'Guardando...' : 'Crear producto' }}
      </button>
    </form>
    <button class="atras" @click="atras()">Atrás</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const cc = ref('')
const cemento = ref(0)
const pintado = ref(0)
const imper = ref(0)
const stock = ref(0)
const alto = ref(0)
const base = ref(0)
const boca = ref(0)
const color = ref()
const guardando = ref(false)
const error = ref('')
const router = useRouter()

const onSubmit = async () => {
  guardando.value = true
  error.value = ''

  try {
    await addDoc(collection(db, 'Productos'), {
      cc: cc.value,
      cemento: cemento.value,
      pintado: pintado.value,
      imper: imper.value,
      stock: stock.value,
      alto: alto.value,
      base: base.value,
      boca: boca.value,
      color: color.value,
    })

    alert('Producto creado correctamente')
    router.push('/') // redirige a la lista u otra ruta
  } catch (e) {
    console.error(e)
    error.value = 'Error al crear el producto'
  } finally {
    guardando.value = false
  }
}

const atras = () => {
  router.back()
}
</script>

<style scoped>
h1 {
  margin-bottom: 0.8em;
  color: #3d3d3d;
  font-size: 1.6em;
  text-align: center;
}
label {
  display: block;
  font-size: 1.1em;
}
input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  width: 100%;
  margin-bottom: 1.5em;
  font-size: 1.1em;
}
button {
  padding: 0.5rem;
  cursor: pointer;
  background-color: #00bd7e;
  border: 0px;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
  margin-bottom: 20px;
}
.atras {
  background-color: #e9e9e9;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
