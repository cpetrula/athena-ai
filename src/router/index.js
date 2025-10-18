import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ClaimView from '../views/ClaimView.vue'
import PolicyView from '../views/PolicyView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: {
      title: 'Dashboard',
      context: 'dashboard'
    }
  },
  {
    path: '/claim/:id',
    name: 'claim',
    component: ClaimView,
    meta: {
      title: 'Claim Details',
      context: 'claim'
    }
  },
  {
    path: '/policy/:id',
    name: 'policy',
    component: PolicyView,
    meta: {
      title: 'Policy Details',
      context: 'policy'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Athena AI` : 'Athena AI'
  next()
})

export default router
