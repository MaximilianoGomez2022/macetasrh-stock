import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EditView from '../views/EditView.vue'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      // Ruta con parámetro dinámico :id
      path: '/productos/:id/editar',
      name: 'EditarStock',
      component: EditView,
      meta: { requiresAuth: true },
      props: true, // para que route.params.id llegue como prop
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// 🚧 Protección de rutas
let isAuthChecked = false

router.beforeEach((to, from, next) => {
  const getCurrentUser = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe() // 🔁 Nos desuscribimos apenas obtenemos el usuario
        resolve(user)
      })
    })
  }

  getCurrentUser().then((user) => {
    if (to.meta.requiresAuth && !user) {
      next('/login')
    } else if (to.path === '/login' && user) {
      next('/home')
    } else {
      next()
    }
  })
})

export default router
