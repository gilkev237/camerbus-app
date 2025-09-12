import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'
import Booking from '@/views/Booking.vue'
import Payment from '@/views/Payment.vue'
import Confirmation from '@/views/Confirmation.vue'
import Profile from '@/views/Profile.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Admin from '@/views/Admin.vue'
import Support from '@/views/Support.vue'
import Placeholder from '@/views/Placeholder.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Booking
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
