<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex items-center justify-center">
          <div class="w-16 h-16 bg-cameroon-gradient rounded-xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-display font-bold text-neutral-900">Connexion</h2>
        <p class="mt-2 text-sm text-neutral-600">
          Accédez à votre compte CamerBus
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-soft rounded-xl">
        <!-- Alert Messages -->
        <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">{{ errorMessage }}</span>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="form.email"
                name="email"
                type="email"
                autocomplete="email"
                required
                :disabled="isLoading"
                :class="[
                  'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 transition-colors duration-200',
                  fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                  isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                ]"
                placeholder="votre@email.com"
              />
              <div v-if="fieldErrors.email" class="text-xs text-red-600 mt-1">
                {{ fieldErrors.email }}
              </div>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700">
              Mot de passe
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="form.password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                :disabled="isLoading"
                :class="[
                  'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 transition-colors duration-200',
                  fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                  isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                ]"
                placeholder="Votre mot de passe"
              />
              <div v-if="fieldErrors.password" class="text-xs text-red-600 mt-1">
                {{ fieldErrors.password }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.remember"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-neutral-900">
                Se souvenir de moi
              </label>
            </div>

            <div class="text-sm">
              <router-link to="/forgot-password" class="font-medium text-primary-600 hover:text-primary-500">
                Mot de passe oublié ?
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </div>

          <div class="text-center">
            <span class="text-sm text-neutral-600">
              Pas encore de compte ?
              <router-link to="/register" class="font-medium text-primary-600 hover:text-primary-500">
                S'inscrire
              </router-link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()

const form = ref({
  email: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const fieldErrors = ref<Record<string, string>>({})

const validateForm = () => {
  fieldErrors.value = {}

  if (!form.value.email) {
    fieldErrors.value.email = 'L\'email est requis'
    return false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    fieldErrors.value.email = 'Format d\'email invalide'
    return false
  }

  if (!form.value.password) {
    fieldErrors.value.password = 'Le mot de passe est requis'
    return false
  }

  if (form.value.password.length < 6) {
    fieldErrors.value.password = 'Le mot de passe doit contenir au moins 6 caractères'
    return false
  }

  return true
}

const login = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await authService.login({
      email: form.value.email,
      password: form.value.password,
      remember: form.value.remember
    })

    if (result.success) {
      // Rediriger vers la page d'accueil ou la page demandée
      const redirectTo = router.currentRoute.value.query.redirect as string || '/'
      router.push(redirectTo)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Une erreur est survenue lors de la connexion'
  } finally {
    isLoading.value = false
  }
}
</script>
