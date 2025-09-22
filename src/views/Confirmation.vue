<template>
  <div class="min-h-screen bg-neutral-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Success Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-3xl font-display font-bold text-neutral-800 mb-2">Réservation confirmée !</h1>
        <p class="text-lg text-neutral-600">Votre billet CamerBus a été généré avec succès</p>
      </div>

      <!-- Booking Details -->
      <div class="bg-white rounded-xl shadow-soft p-8 mb-8">
        <div class="flex items-center justify-between mb-6 pb-6 border-b border-neutral-200">
          <div>
            <h2 class="text-xl font-semibold text-neutral-800">Référence de réservation</h2>
            <p class="text-2xl font-bold text-primary-600 mt-1">{{ confirmationData.bookingReference }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-neutral-600">Montant payé</div>
            <div class="text-2xl font-bold text-neutral-800">{{ confirmationData.totalPrice?.toLocaleString() }} FCFA</div>
          </div>
        </div>

        <!-- Trip Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Détails du voyage
            </h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Départ:</span>
                <span class="font-medium">{{ confirmationData.route?.from }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Destination:</span>
                <span class="font-medium">{{ confirmationData.route?.to }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Date:</span>
                <span class="font-medium">{{ formatDate(confirmationData.route?.date ?? '') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Type de bus:</span>
                <span class="font-medium">{{ getBusTypeName(confirmationData.busType ?? '') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Places:</span>
                <span class="font-medium">{{ confirmationData.seats?.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
              <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Passagers
            </h3>
            <div class="space-y-3">
              <div
                v-for="(passenger, index) in confirmationData.passengers"
                :key="index"
                class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <div class="font-medium text-neutral-800">{{ passenger.fullName }}</div>
                  <div class="text-sm text-neutral-600">Place {{ confirmationData.seats?.[index] }}</div>
                </div>
                <div class="text-sm text-neutral-600">{{ passenger.phone }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- QR Code and E-Ticket -->
        <div class="border-t border-neutral-200 pt-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
                <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4M8 12V8M8 8V4m0 4h4m-4 8h4m-4 0v4M8 16h4" />
                </svg>
                Code QR pour validation
              </h3>
              <div class="flex justify-center">
                <div class="w-48 h-48 bg-neutral-100 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center">
                  <div class="text-center">
                    <svg class="w-16 h-16 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4M8 12V8M8 8V4m0 4h4m-4 8h4m-4 0v4M8 16h4" />
                    </svg>
                    <div class="text-sm text-neutral-500">Code QR généré</div>
                    <div class="text-xs text-neutral-400 mt-1">{{ confirmationData.bookingReference }}</div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-neutral-600 text-center mt-4">
                Présentez ce code QR au conducteur lors de l'embarquement
              </p>
            </div>

            <div>
              <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
                <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Actions disponibles
              </h3>
              <div class="space-y-3">
                <button
                  @click="downloadTicket"
                  class="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Télécharger le billet (PDF)</span>
                </button>

                <button
                  @click="sendByEmail"
                  class="w-full flex items-center justify-center space-x-2 bg-neutral-600 hover:bg-neutral-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Envoyer par email</span>
                </button>

                <button
                  @click="addToCalendar"
                  class="w-full flex items-center justify-center space-x-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Ajouter au calendrier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Important Information -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h3 class="font-medium text-blue-800 mb-4 flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informations importantes
        </h3>
        <ul class="space-y-2 text-sm text-blue-800">
          <li class="flex items-start space-x-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Présentez-vous à la gare <strong>30 minutes avant</strong> l'heure de départ</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Munissez-vous d'une <strong>pièce d'identité valide</strong> et de votre billet</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Les bagages de <strong>plus de 20kg</strong> sont soumis à des frais supplémentaires</span>
          </li>
          <li class="flex items-start space-x-2">
            <span class="text-blue-600 mt-1">•</span>
            <span>Annulation gratuite jusqu'à <strong>24h avant</strong> le départ</span>
          </li>
        </ul>
      </div>

      <!-- Contact and Next Steps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
            <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l7.071 7.071-7.071 7.071L4.929 9.915 12 2.944z" />
            </svg>
            Besoin d'aide ?
          </h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+237 xxx xxx xxx</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@camerbus.cm</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Support 24h/24 - 7j/7</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
            <svg class="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            Prochaines étapes
          </h3>
          <div class="space-y-3">
            <router-link
              to="/profile"
              class="block w-full text-center bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Voir mes réservations
            </router-link>
            <router-link
              to="/"
              class="block w-full text-center border border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Nouvelle réservation
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { bookingService } from '@/services/bookingService'

const route = useRoute()
const router = useRouter()

interface ConfirmationData { bookingReference?: string; totalPrice: number; route?: { from?: string; to?: string; date?: string }; busType?: string; seats?: string[] | number[]; passengers?: Array<{ fullName: string; phone: string }> }
const confirmationData = ref<ConfirmationData>({ totalPrice: 0 })

// Methods
const getBusTypeName = (typeId: string) => {
  const types: Record<string, string> = {
    standard: 'Standard',
    vip: 'VIP',
    executive: 'Executive'
  }
  return types[typeId] || 'Standard'
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

import { downloadBookingPdfAsync } from '@/utils/pdf'

const downloadTicket = async () => {
  const data = confirmationData.value
  await downloadBookingPdfAsync({
    reference: data.bookingReference || 'CMB-' + Date.now().toString().slice(-8),
    from: data.route?.from || '',
    to: data.route?.to || '',
    date: data.route?.date || new Date().toISOString(),
    seats: (data.seats || []).map((s) => String(s)),
    totalPrice: data.totalPrice,
    busType: data.busType ? getBusTypeName(data.busType) : undefined,
    passengers: (data.passengers || []).map((p) => ({ fullName: p.fullName, phone: p.phone }))
  })
}

const sendByEmail = async () => {
  const email = prompt('Entrez l\'adresse email pour envoyer le billet:') || ''
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Adresse email invalide')
    return
  }

  const ref = confirmationData.value.bookingReference || 'CMB-' + Date.now().toString().slice(-8)
  const mockBookingId = ref // we use reference as id surrogate in demo
  const result = await bookingService.emailTicket(mockBookingId, email)
  if (result.success) {
    alert(result.message)
  } else {
    alert(result.message)
  }
}

const addToCalendar = () => {
  // Simulate calendar integration
  alert('Événement ajouté au calendrier ! (Fonctionnalité simulée)')
}

onMounted(() => {
  // Load confirmation data
  const storedData = localStorage.getItem('confirmationData')
  if (storedData) {
    confirmationData.value = JSON.parse(storedData)
  } else {
    // Redirect if no confirmation data
    router.push('/')
  }
})
</script>

<style scoped>
.success-animation {
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
</style>
