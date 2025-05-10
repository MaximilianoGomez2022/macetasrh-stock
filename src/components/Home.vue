<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase' // ajustá el path si está en otra carpeta
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'vue-router'
import Agregar from './Agregar.vue'

const productos = ref([])
const filtroCc = ref('') // texto que escribe el usuario
const modalVisible = ref(false)
const productoSeleccionado = ref(null)
const nuevoStock = ref('')
const productosPorPagina = 5 // cantidad de productos por páginas
const paginaActual = ref(1)
const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push('/login')
}

const cargarProductos = async () => {
  const querySnapshot = await getDocs(collection(db, 'Productos'))
  productos.value = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

const totalPaginas = computed(() => {
  Math.ceil(productosFiltrados.value.length / productosPorPagina)
})

const total = computed(() => {
  return productos.value.reduce((acc, producto) => acc + (producto.stock || 0), 0)
})

const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * productosPorPagina
  return productosFiltrados.value.slice(inicio, inicio + productosPorPagina)
})

// Resetear a la página 1 si cambia el filtro
watch(filtroCc, () => {
  paginaActual.value = 1
})

onMounted(() => {
  cargarProductos()
})

// filtro + orden ascendente
const productosFiltrados = computed(() => {
  let filtrados = productos.value

  if (filtroCc.value) {
    filtrados = filtrados.filter((p) => p.cc?.toString().includes(filtroCc.value))
  }

  return filtrados.sort((a, b) => (a.cc ?? 0) - (b.cc ?? 0))
})

const abrirModal = (producto) => {
  productoSeleccionado.value = producto
  nuevoStock.value = producto.stock ?? ''
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  productoSeleccionado.value = null
  nuevoStock.value = ''
}

const guardarCambios = () => {
  console.log(`Nuevo stock para ${productoSeleccionado.value.cc}: ${nuevoStock.value}`)
  cerrarModal()
}

function goToEditar(id) {
  router.push({ name: 'EditarStock', params: { id } })
}
</script>

<template>
  <div>
    <div class="encabezado">
    <h1>PRODUCTOS</h1>
    <input v-model="filtroCc" type="text" placeholder="Buscar por número de CC" class="buscador" />
    </div>
    <h2>MACETAS EN STOCK: {{ total }}</h2>
    <ul>
      <li v-for="producto in productosPaginados" :key="producto.id">
        <div>CC {{ producto.cc }}</div>
        <div v-if="producto.stock > 0">STOCK {{ producto.stock }}</div>
        <div v-else>SIN STOCK</div>
        <div><button @click="goToEditar(producto.id)" class="btn-editar">Editar</button></div>
      </li>
    </ul>
  </div>

  <!-- Controles de paginación -->
  <div class="paginacion">
    <div class="contenedor-paginacion">
      <button @click="paginaActual--" :disabled="paginaActual === 1">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
      <button @click="paginaActual++" :disabled="paginaActual === totalPaginas">
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
  <button @click="logout">Cerrar sesión</button>
</template>

<style scoped>
.encabezado {
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 12px;
  font-size: 20px;
}
ul li {
  list-style: none;
}
h1 {
  color: #3d3d3d;
}

input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
}

button {
  padding: 0.3rem 0.7rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.modal {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
}
.btn-editar {
  margin-left: 10px;
  padding: 0.5rem;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  background-color: #00bd7e;
  border: 0px;
  border-radius: 8px;
  padding: 15px;
  width: 100%;
}
.paginacion button {
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  background-color: #00bd7e;
  border: 0px;
  border-radius: 6px;
  padding: 15px;
  width: 20%;
}
.paginacion {
  width: 95%;
  margin: auto;
}
.contenedor-paginacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 20px;
}
.buscador {
  border-color: #ccc;
  border-radius: 6px;
  outline: none;
  border-style: solid;
}
</style>
