<template>
  <h1>EDITAR STOCK</h1>
  <div v-if="cargando">Cargando…</div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>
    <form @submit.prevent="onSubmit">
      <label> CC: </label>
      <input type="text" :value="producto.cc" disabled />
      <label> Stock: </label>
      <input type="number" v-model.number="nuevoStock" min="0" />

      <button type="submit" :disabled="guardando">
        {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
      </button>
    </form>
    <button class="atras" @click="atras()">Atrás</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

// estado reactivo
const producto = ref({})
const nuevoStock = ref(0)
const cargando = ref(true)
const guardando = ref(false)
const error = ref('')
const route = useRoute()
const router = useRouter()

// 1) Al montar, traemos el producto por ID
onMounted(async () => {
  const id = route.params.id
  try {
    const refDoc = doc(db, 'Productos', id)
    const snap = await getDoc(refDoc)

    if (!snap.exists()) {
      error.value = 'Producto no encontrado'
    } else {
      producto.value = { id: snap.id, ...snap.data() }
      nuevoStock.value = producto.value.stock ?? 0
      console.log(producto)
    }
  } catch (e) {
    console.error(e)
    error.value = 'Error al cargar el producto'
  } finally {
    cargando.value = false
  }
})

const onSubmit = async () => {
  guardando.value = true
  error.value = ''

  try {
    const refDoc = doc(db, 'Productos', producto.value.id)
    await updateDoc(refDoc, {
      stock: nuevoStock.value,
    })

    // Opcional: redirigir, mostrar mensaje, etc.
    alert('Producto actualizado correctamente')
    router.push('/') // redirige si querés
  } catch (e) {
    console.error(e)
    error.value = 'Error al actualizar el producto'
  } finally {
    guardando.value = false
  }
}

const atras = () => {
  router.back() // Vuelve a la página anterior en el historial
}
</script>

<style scoped>
h1 {
  margin-bottom: 0.8em;
  color: #3d3d3d;
  text-align: center;
}
label {
  display: block;
}
input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  width: 100%;
  margin-bottom: 1.2em;
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
