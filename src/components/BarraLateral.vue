<template>
  <aside></aside>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const props = defineProps({
  //   onLogout: {
  //     type: Function,
  //     required: true,
  //   },
})

const store = useStore()

// const isOpen = computed(() => store.state.sidebar.isOpen)
// const isLogin = computed(() => store.state.login.isLogin)

// const toggle = () => {
//   store.commit('sidebar/toggleSidebar')
// }
</script>

<style scoped>
/* Acá podés poner los estilos que ya usás en React */
.sidebar {
  transition: all 0.3s ease;
}

/* Botón de Toggle */
#toggle-btn {
  position: absolute;
  top: 5em;
  right: 12px;
  background-color: #e8a41c;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 3px;
  width: 40px;
}

/* Sidebar */
#sidebar {
  height: 100vh;
  background: #000000;
  color: white;
  padding-top: 4em;
  transition: all 0.3s ease;
  position: relative;
}

.sidebar.open {
  width: 20%;
}

/* Ocultar Sidebar */
.sidebar.closed {
  width: 5%;
  transition: all 0.3s ease;
}

/* Navegación */
nav a {
  display: flex;
  align-items: center;
  color: #f8b11e;
  text-decoration: none;
  padding: 10px 0;
  font-size: 18px;
}

nav a i {
  margin-right: 10px;
}

.main-open {
  width: 80vw;
  transition: width 0.3s ease;
}

.main-closed {
  width: 95%;
  transition: width 0.3s ease;
}

.nav-open {
  padding: 30px;
  transform: translateX(0vw);
  transition: all 0.3s ease;
  padding-top: 0;
}

.nav-open h2 {
  margin-bottom: 1.4em;
}

.nav-open a {
  margin-bottom: 0.3em;
  text-decoration: none;
}

.nav-open li {
  list-style: none;
}

.nav-closed {
  transform: translateX(-100vw);
  transition: all 0.3s ease;
}

.barra-block {
  display: block;
}

.barra-none {
  display: none;
}

.inicio-sesion p {
  text-align: left;
}

.sin-permiso {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
