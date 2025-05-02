<template>
  <div class="login-container">
    <div>
      <h1>Iniciar sesión</h1>
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="login">Ingresar</button>
      <p v-if="error" class="error"> {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// ✅ Referencias reactivas
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

// 👤 Email autorizado (el único que puede entrar)
const allowedEmail = 'rdhuide@gmail.com' // cambialo por el tuyo

// 🔐 Función de login
const login = async () => {
  error.value = ''
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)

    if (userCredential.user.email !== allowedEmail) {
      error.value = 'Acceso denegado: usuario no autorizado'
      return
    }

    // Esperamos a que Firebase establezca el estado de sesión
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe() // Nos desuscribimos para evitar llamadas múltiples
        router.push('/home')
      }
    })
  } catch (err) {
    console.error('Error al iniciar sesión:', err)
    error.value = err.message
  }
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: #3d3d3d;
}
.login-container {
  width: 100%;
}
.login-container div {
  max-width: 400px;
  margin: auto;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}
input {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 12px;
  outline: none;
  font-size: 1.1em;
  font-weight: bold;
  color: rgb(63, 63, 63);
}
button {
  padding: 0.5rem;
  cursor: pointer;
  background-color: #00bd7e;
  border: 0px;
  border-radius: 8px;
  padding: 15px;
}
.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
