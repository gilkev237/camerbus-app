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
        <h2 class="mt-6 text-3xl font-display font-bold text-neutral-900">Créer un compte</h2>
        <p class="mt-2 text-sm text-neutral-600">
          Rejoignez CamerBus pour voyager facilement
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

        <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          <div class="flex">
            <svg class="w-5 h-5 text-green-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-sm">{{ successMessage }}</span>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="register">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label for="fullName" class="block text-sm font-medium text-neutral-700">
                Nom complet
              </label>
              <div class="mt-1">
                <input
                  id="fullName"
                  v-model="form.fullName"
                  name="fullName"
                  type="text"
                  required
                  :disabled="isLoading"
                  :class="[
                    'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    fieldErrors.fullName ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                    isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                  ]"
                  placeholder="Votre nom complet"
                  @blur="validateField('fullName')"
                />
                <div v-if="fieldErrors.fullName" class="text-xs text-red-600 mt-1">
                  {{ fieldErrors.fullName }}
                </div>
              </div>
            </div>

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
                    'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    fieldErrors.email ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                    isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                  ]"
                  placeholder="votre@email.com"
                  @blur="validateField('email')"
                />
                <div v-if="fieldErrors.email" class="text-xs text-red-600 mt-1">
                  {{ fieldErrors.email }}
                </div>
              </div>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-neutral-700">
                Téléphone
              </label>
              <div class="mt-1">
                <input
                  id="phone"
                  v-model="form.phone"
                  name="phone"
                  type="tel"
                  required
                  :disabled="isLoading"
                  :class="[
                    'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    fieldErrors.phone ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                    isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                  ]"
                  placeholder="+237 xxx xxx xxx"
                  @blur="validateField('phone')"
                />
                <div v-if="fieldErrors.phone" class="text-xs text-red-600 mt-1">
                  {{ fieldErrors.phone }}
                </div>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-neutral-700">
                Mot de passe
              </label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  :disabled="isLoading"
                  :class="[
                    'appearance-none relative block w-full px-3 py-3 pr-10 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    fieldErrors.password ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                    isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                  ]"
                  placeholder="Choisissez un mot de passe"
                  @input="validateField('password')"
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
              <div v-if="form.password" class="mt-2">
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

              <div v-if="fieldErrors.password" class="text-xs text-red-600 mt-1">
                {{ fieldErrors.password }}
              </div>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-neutral-700">
                Confirmer le mot de passe
              </label>
              <div class="mt-1">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  :disabled="isLoading"
                  :class="[
                    'appearance-none relative block w-full px-3 py-3 border placeholder-neutral-500 text-neutral-900 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200',
                    fieldErrors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-neutral-300',
                    isLoading ? 'bg-neutral-100 cursor-not-allowed' : ''
                  ]"
                  placeholder="Confirmez votre mot de passe"
                  @blur="validateField('confirmPassword')"
                />
                <div v-if="fieldErrors.confirmPassword" class="text-xs text-red-600 mt-1">
                  {{ fieldErrors.confirmPassword }}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="flex items-start">
              <input
                id="terms"
                v-model="form.acceptTerms"
                name="terms"
                type="checkbox"
                required
                :disabled="isLoading"
                :class="[
                  'h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1',
                  isLoading ? 'cursor-not-allowed' : ''
                ]"
                @change="validateField('acceptTerms')"
              />
              <label for="terms" class="ml-2 block text-sm text-neutral-900">
                J'accepte les
                <a href="#" class="text-primary-600 hover:text-primary-500">conditions d'utilisation</a>
                et la
                <a href="#" class="text-primary-600 hover:text-primary-500">politique de confidentialité</a>
              </label>
            </div>
            <div v-if="fieldErrors.acceptTerms" class="text-xs text-red-600 mt-1 ml-6">
              {{ fieldErrors.acceptTerms }}
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading || !isFormValid"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Création en cours...' : 'Créer mon compte' }}
            </button>
          </div>

          <div class="text-center">
            <span class="text-sm text-neutral-600">
              Vous avez déjà un compte ?
              <router-link to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                Se connecter
              </router-link>
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService'

const router = useRouter()

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const fieldErrors = ref<Record<string, string>>({})
const passwordStrength = ref(0)
const showPassword = ref(false)

const isFormValid = computed(() => {
  return form.value.fullName &&
         form.value.email &&
         form.value.phone &&
         form.value.password &&
         form.value.confirmPassword &&
         form.value.acceptTerms &&
         form.value.password === form.value.confirmPassword &&
         form.value.password.length >= 6
})

const validateField = (field: string) => {
  switch (field) {
    case 'fullName':
      if (!form.value.fullName) {
        fieldErrors.value.fullName = 'Le nom complet est requis'
      } else if (form.value.fullName.length < 2) {
        fieldErrors.value.fullName = 'Le nom doit contenir au moins 2 caractères'
      } else {
        delete fieldErrors.value.fullName
      }
      break

    case 'email':
      if (!form.value.email) {
        fieldErrors.value.email = 'L\'email est requis'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        fieldErrors.value.email = 'Format d\'email invalide'
      } else {
        delete fieldErrors.value.email
      }
      break

    case 'phone':
      if (!form.value.phone) {
        fieldErrors.value.phone = 'Le téléphone est requis'
      } else if (!/^\+?237[\s\-]?[679]\d{8}$/.test(form.value.phone.replace(/\s/g, ''))) {
        fieldErrors.value.phone = 'Format de téléphone camerounais invalide (+237 xxx xxx xxx)'
      } else {
        delete fieldErrors.value.phone
      }
      break

    case 'password':
      if (!form.value.password) {
        fieldErrors.value.password = 'Le mot de passe est requis'
      } else if (form.value.password.length < 6) {
        fieldErrors.value.password = 'Le mot de passe doit contenir au moins 6 caractères'
      } else {
        delete fieldErrors.value.password
      }
      calculatePasswordStrength()
      break

    case 'confirmPassword':
      if (!form.value.confirmPassword) {
        fieldErrors.value.confirmPassword = 'La confirmation est requise'
      } else if (form.value.password !== form.value.confirmPassword) {
        fieldErrors.value.confirmPassword = 'Les mots de passe ne correspondent pas'
      } else {
        delete fieldErrors.value.confirmPassword
      }
      break
  }
}

const calculatePasswordStrength = () => {
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

const validateForm = () => {
  validateField('fullName')
  validateField('email')
  validateField('phone')
  validateField('password')
  validateField('confirmPassword')

  if (!form.value.acceptTerms) {
    fieldErrors.value.acceptTerms = 'Vous devez accepter les conditions'
  } else {
    delete fieldErrors.value.acceptTerms
  }

  return Object.keys(fieldErrors.value).length === 0
}

const register = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const result = await authService.register({
      fullName: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      confirmPassword: form.value.confirmPassword,
      acceptTerms: form.value.acceptTerms
    })

    if (result.success) {
      successMessage.value = result.message

      // Rediriger vers la page de connexion après 3 secondes
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue lors de l\'inscription'
  } finally {
    isLoading.value = false
  }
}
</script>
