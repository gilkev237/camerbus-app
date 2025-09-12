<template>
  <header class="bg-white shadow-soft sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-cameroon-gradient rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span class="text-xl font-display font-bold text-neutral-800">CamerBus</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/" class="text-neutral-600 hover:text-primary-600 transition-colors duration-200">
            Accueil
          </router-link>
          <router-link to="/search" class="text-neutral-600 hover:text-primary-600 transition-colors duration-200">
            Rechercher
          </router-link>
          <router-link to="/support" class="text-neutral-600 hover:text-primary-600 transition-colors duration-200">
            Support
          </router-link>
        </nav>

        <!-- Auth Buttons / User -->
        <div class="flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              class="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors duration-200"
            >
              S'inscrire
            </router-link>
          </template>
          <template v-else>
            <router-link to="/profile" class="hidden sm:inline-flex items-center space-x-2 px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-sm font-bold">
                {{ userInitials }}
              </div>
              <span class="text-sm font-medium text-neutral-800">{{ currentUser?.fullName }}</span>
            </router-link>
            <button @click="logout" class="inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-red-600 transition-colors duration-200">
              Déconnexion
            </button>
          </template>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 hover:text-primary-600 hover:bg-neutral-100 transition-colors duration-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-neutral-200">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
          >
            Accueil
          </router-link>
          <router-link
            to="/search"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
          >
            Rechercher
          </router-link>
          <router-link
            to="/support"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
          >
            Support
          </router-link>
          <template v-if="!isAuthenticated">
            <router-link
              to="/login"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
            >
              S'inscrire
            </router-link>
          </template>
          <template v-else>
            <router-link
              to="/profile"
              @click="mobileMenuOpen = false"
              class="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
            >
              Mon profil
            </router-link>
            <button
              @click="logout(); mobileMenuOpen = false"
              class="w-full text-left block px-3 py-2 text-base font-medium text-neutral-600 hover:text-red-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
            >
              Déconnexion
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()
const mobileMenuOpen = ref(false)
const isAuthenticated = ref(authService.isAuthenticated())
const currentUser = ref(authService.getCurrentUser())

let unsubscribe: (() => void) | null = null
onMounted(() => {
  unsubscribe = authService.onAuthChange((state) => {
    isAuthenticated.value = state.isAuthenticated && !!state.token
    currentUser.value = state.user
  })
})

onUnmounted(() => {
  if (unsubscribe) unsubscribe()
})

const userInitials = computed(() => {
  const name = currentUser.value?.fullName || ''
  return name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2).toUpperCase()
})

const logout = () => {
  authService.logout()
  router.push('/')
}
</script>
