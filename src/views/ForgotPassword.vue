<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="flex items-center justify-center">
          <div class="w-16 h-16 bg-cameroon-gradient rounded-xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-display font-bold text-neutral-900">
          {{ step === 'email' ? 'Mot de passe oublié ?' : 'Réinitialiser le mot de passe' }}
        </h2>
        <p class="mt-2 text-sm text-neutral-600">
          {{ step === 'email'
              ? 'Entrez votre adresse email pour recevoir un lien de réinitialisation'
              : 'Entrez votre nouveau mot de passe'
          }}
        </p>
      </div>

      <div class="bg-white py-8 px-6 shadow-soft rounded-xl">
        <!-- Step 1: Enter Email -->
        <form v-if="step === 'email'" @submit.prevent="sendResetEmail" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700">
              Adresse email
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
                class="appearance-none relative block w-full px-3 py-3 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">{{ errorMessage }}</span>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">{{ successMessage }}</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !form.email"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation' }}
            </button>
          </div>

          <div class="text-center">
            <router-link to="/login" class="text-sm text-primary-600 hover:text-primary-500">
              ← Retour à la connexion
            </router-link>
          </div>
        </form>

        <!-- Step 2: Reset Password -->
        <form v-if="step === 'reset'" @submit.prevent="resetPassword" class="space-y-6">
          <!-- Test Accounts Info -->
          <div class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-blue-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-sm">
                <p class="font-medium mb-2">Comptes de test pour réinitialisation :</p>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    @click="form.email = 'jean.dupont@email.com'"
                    type="button"
                    class="px-2 py-1 text-xs border border-blue-300 rounded hover:bg-blue-100 transition-colors"
                  >
                    👤 Jean
                  </button>
                  <button
                    @click="form.email = 'marie.kamga@email.com'"
                    type="button"
                    class="px-2 py-1 text-xs border border-blue-300 rounded hover:bg-blue-100 transition-colors"
                  >
                    👑 Marie
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label for="resetEmail" class="block text-sm font-medium text-neutral-700">
              Email
            </label>
            <div class="mt-1">
              <input
                id="resetEmail"
                v-model="form.email"
                name="resetEmail"
                type="email"
                required
                :disabled="isLoading"
                class="appearance-none relative block w-full px-3 py-3 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700">
              Nouveau mot de passe
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="form.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                required
                :disabled="isLoading"
                class="appearance-none relative block w-full px-3 py-3 pr-10 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                placeholder="Nouveau mot de passe"
                @input="validatePassword"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg v-if="showPassword" class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.929 6.929m2.949 2.949l4.242 4.242M19.071 6.929a10.018 10.018 0 014.929 5.071c-1.275 4.057-5.064 7-9.542 7m0 0L15 15m-6 6l6-6"/>
                </svg>
                <svg v-else class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>

            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex space-x-1">
                <div
                  v-for="i in 4"
                  :key="i"
                  class="h-1 flex-1 rounded-full"
                  :class="{
                    'bg-red-200': passwordStrength === 0,
                    'bg-red-400': passwordStrength === 1 && i === 1,
                    'bg-yellow-400': passwordStrength === 2 && i <= 2,
                    'bg-blue-400': passwordStrength === 3 && i <= 3,
                    'bg-green-400': passwordStrength === 4 && i <= 4,
                    'bg-neutral-200': (passwordStrength < i)
                  }"
                ></div>
              </div>
              <div class="text-xs text-neutral-600 mt-1">
                {{ getPasswordStrengthText() }}
              </div>
            </div>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-neutral-700">
              Confirmer le nouveau mot de passe
            </label>
            <div class="mt-1">
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                name="confirmPassword"
                type="password"
                required
                :disabled="isLoading"
                class="appearance-none relative block w-full px-3 py-3 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 disabled:bg-neutral-100 disabled:cursor-not-allowed"
                placeholder="Confirmez le nouveau mot de passe"
              />
            </div>
            <div v-if="form.confirmPassword && form.password !== form.confirmPassword" class="text-xs text-red-600 mt-1">
              Les mots de passe ne correspondent pas
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <div class="flex">
              <svg class="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm">{{ errorMessage }}</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !isPasswordValid"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe' }}
            </button>
          </div>
        </form>

        <!-- Step 3: Success -->
        <div v-if="step === 'success'" class="text-center space-y-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <div>
            <h3 class="text-lg font-medium text-neutral-900 mb-2">Mot de passe réinitialisé !</h3>
            <p class="text-sm text-neutral-600">
              Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
            </p>
          </div>

          <router-link
            to="/login"
            class="w-full inline-flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
          >
            Se connecter
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const route = useRoute()
const router = useRouter()

const step = ref<'email' | 'reset' | 'success'>('email')
const isLoading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const passwordStrength = ref(0)

const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const isPasswordValid = computed(() => {
  return form.value.email &&
         form.value.password.length >= 6 &&
         form.value.password === form.value.confirmPassword
})

const sendResetEmail = async () => {
  if (!form.value.email) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authService.forgotPassword(form.value.email)

    if (result.success) {
      successMessage.value = result.message

      // Simulation: après 3 secondes, passer à l'étape suivante pour la démo
      setTimeout(() => {
        step.value = 'reset'
        successMessage.value = ''
      }, 3000)
    } else {
      errorMessage.value = result.message
    }
  } catch {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const resetPassword = async () => {
  if (!isPasswordValid.value || !form.value.email) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    // Stocker l'email temporairement
    localStorage.setItem('camerbus_reset_email', form.value.email)

    // Récupérer le token depuis l'URL ou utiliser un token de démo
    const token = route.query.token as string || 'valid_reset_token'

    const result = await authService.resetPassword(token, form.value.password)

    if (result.success) {
      step.value = 'success'
    } else {
      errorMessage.value = result.message
    }
  } catch {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
  } finally {
    isLoading.value = false
  }
}

const validatePassword = () => {
  const password = form.value.password
  let strength = 0

  if (password.length >= 6) strength++
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  passwordStrength.value = Math.min(strength, 4)
}

const getPasswordStrengthText = () => {
  switch (passwordStrength.value) {
    case 0:
    case 1:
      return 'Mot de passe faible'
    case 2:
      return 'Mot de passe moyen'
    case 3:
      return 'Mot de passe fort'
    case 4:
      return 'Mot de passe très fort'
    default:
      return 'Entrez un mot de passe'
  }
}

onMounted(() => {
  // Si un token est présent dans l'URL, aller directement à l'étape de réinitialisation
  if (route.query.token) {
    step.value = 'reset'
  }
})
</script>
