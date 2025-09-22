<template>
  <div class="min-h-screen bg-neutral-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="bg-white rounded-xl shadow-soft p-6 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-display font-bold text-neutral-800">Paiement sécurisé</h1>
            <p class="text-neutral-600 mt-1">Finalisez votre réservation CamerBus</p>
          </div>
          <div class="text-right">
            <div class="text-2xl font-bold text-primary-600">{{ bookingData.totalPrice?.toLocaleString() }} FCFA</div>
            <div class="text-sm text-neutral-600">Montant total</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Payment Methods -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Choisir le mode de paiement</h2>

            <div class="space-y-4">
              <!-- MTN Mobile Money -->
              <div
                @click="selectedPaymentMethod = 'mtn'"
                :class="[
                  'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200',
                  selectedPaymentMethod === 'mtn'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                ]"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                    <span class="text-gold-600 font-bold text-lg">MTN</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-medium text-neutral-800">MTN Mobile Money</h3>
                    <p class="text-sm text-neutral-600">Paiement via votre compte MTN MoMo</p>
                  </div>
                  <div
                    :class="[
                      'w-5 h-5 rounded-full border-2 transition-colors',
                      selectedPaymentMethod === 'mtn'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-neutral-300'
                    ]"
                  >
                    <div v-if="selectedPaymentMethod === 'mtn'" class="w-full h-full rounded-full bg-white scale-50"></div>
                  </div>
                </div>
              </div>

              <!-- Orange Money -->
              <div
                @click="selectedPaymentMethod = 'orange'"
                :class="[
                  'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200',
                  selectedPaymentMethod === 'orange'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                ]"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span class="text-orange-600 font-bold text-lg">OM</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-medium text-neutral-800">Orange Money</h3>
                    <p class="text-sm text-neutral-600">Paiement via votre compte Orange Money</p>
                  </div>
                  <div
                    :class="[
                      'w-5 h-5 rounded-full border-2 transition-colors',
                      selectedPaymentMethod === 'orange'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-neutral-300'
                    ]"
                  >
                    <div v-if="selectedPaymentMethod === 'orange'" class="w-full h-full rounded-full bg-white scale-50"></div>
                  </div>
                </div>
              </div>

              <!-- Bank Card -->
              <div
                @click="selectedPaymentMethod = 'card'"
                :class="[
                  'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200',
                  selectedPaymentMethod === 'card'
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-200 hover:border-primary-300'
                ]"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-medium text-neutral-800">Carte bancaire</h3>
                    <p class="text-sm text-neutral-600">Visa, Mastercard acceptées</p>
                  </div>
                  <div
                    :class="[
                      'w-5 h-5 rounded-full border-2 transition-colors',
                      selectedPaymentMethod === 'card'
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-neutral-300'
                    ]"
                  >
                    <div v-if="selectedPaymentMethod === 'card'" class="w-full h-full rounded-full bg-white scale-50"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Form -->
            <div v-if="selectedPaymentMethod" class="mt-8 p-6 bg-neutral-50 rounded-lg">
              <!-- MTN Form -->
              <div v-if="selectedPaymentMethod === 'mtn'">
                <h3 class="font-medium text-neutral-800 mb-4">Informations MTN Mobile Money</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Numéro de téléphone MTN</label>
                    <input
                      v-model="paymentForm.mtnNumber"
                      type="tel"
                      placeholder="6XX XXX XXX"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div class="bg-gold-50 border border-gold-200 rounded-lg p-4">
                    <div class="flex items-start space-x-3">
                      <svg class="w-5 h-5 text-gold-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div class="text-sm text-gold-800">
                        <p class="font-medium">Instructions de paiement :</p>
                        <ol class="list-decimal list-inside mt-2 space-y-1">
                          <li>Composez *126# sur votre téléphone MTN</li>
                          <li>Suivez les instructions pour confirmer le paiement</li>
                          <li>Vous recevrez un SMS de confirmation</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Orange Form -->
              <div v-if="selectedPaymentMethod === 'orange'">
                <h3 class="font-medium text-neutral-800 mb-4">Informations Orange Money</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Numéro de téléphone Orange</label>
                    <input
                      v-model="paymentForm.orangeNumber"
                      type="tel"
                      placeholder="6XX XXX XXX"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div class="flex items-start space-x-3">
                      <svg class="w-5 h-5 text-orange-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div class="text-sm text-orange-800">
                        <p class="font-medium">Instructions de paiement :</p>
                        <ol class="list-decimal list-inside mt-2 space-y-1">
                          <li>Composez #150# sur votre téléphone Orange</li>
                          <li>Suivez les instructions pour confirmer le paiement</li>
                          <li>Vous recevrez un SMS de confirmation</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Card Form -->
              <div v-if="selectedPaymentMethod === 'card'">
                <h3 class="font-medium text-neutral-800 mb-4">Informations de la carte</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Numéro de carte</label>
                    <input
                      v-model="paymentForm.cardNumber"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-neutral-700 mb-2">Date d'expiration</label>
                      <input
                        v-model="paymentForm.expiryDate"
                        type="text"
                        placeholder="MM/AA"
                        class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-neutral-700 mb-2">CVV</label>
                      <input
                        v-model="paymentForm.cvv"
                        type="text"
                        placeholder="123"
                        class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Nom sur la carte</label>
                    <input
                      v-model="paymentForm.cardName"
                      type="text"
                      placeholder="JEAN DUPONT"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Button -->
            <div class="mt-8">
              <button
                @click="processPayment"
                :disabled="!canPay"
                class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Payer {{ bookingData.totalPrice?.toLocaleString() }} FCFA</span>
              </button>
            </div>

            <!-- Security Info -->
            <div class="mt-6 flex items-center justify-center space-x-4 text-sm text-neutral-600">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Paiement 100% sécurisé</span>
              </div>
              <span>•</span>
              <span>SSL 256-bit</span>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <!-- Booking Summary -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Récapitulatif</h3>

            <div class="space-y-4">
              <!-- Trip Info -->
              <div class="pb-4 border-b border-neutral-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-neutral-800">Trajet</span>
                </div>
                <div class="text-sm text-neutral-600">
                  <div>{{ bookingData.route?.from }} → {{ bookingData.route?.to }}</div>
                  <div>{{ formatDate(bookingData.route?.date ?? '') }}</div>
                </div>
              </div>

              <!-- Seats -->
              <div class="pb-4 border-b border-neutral-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-neutral-800">Places</span>
                  <span class="text-sm text-neutral-600">{{ bookingData.seats?.join(', ') }}</span>
                </div>
                <div class="text-sm text-neutral-600">
                  Type: {{ getBusTypeName(bookingData.busType ?? '') }}
                </div>
              </div>

              <!-- Passengers -->
              <div class="pb-4 border-b border-neutral-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="font-medium text-neutral-800">Passagers</span>
                  <span class="text-sm text-neutral-600">{{ bookingData.passengers?.length }}</span>
                </div>
                <div class="space-y-1">
                  <div
                    v-for="(passenger, index) in bookingData.passengers"
                    :key="index"
                    class="text-sm text-neutral-600 truncate"
                  >
                    {{ passenger.fullName }}
                  </div>
                </div>
              </div>

              <!-- Price Breakdown -->
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-neutral-600">Billets</span>
                  <span>{{ calculateSubtotal().toLocaleString() }} FCFA</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-neutral-600">Frais de service</span>
                  <span>500 FCFA</span>
                </div>
                <div class="flex justify-between font-semibold text-lg pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span class="text-primary-600">{{ bookingData.totalPrice?.toLocaleString() }} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Support -->
          <div class="bg-primary-50 rounded-xl p-6">
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l7.071 7.071-7.071 7.071L4.929 9.915 12 2.944z" />
              </svg>
              <div>
                <h4 class="font-medium text-primary-800 mb-2">Support 24/7</h4>
                <p class="text-sm text-primary-700 mb-3">Une question ? Notre équipe est là pour vous aider</p>
                <div class="space-y-1 text-sm text-primary-700">
                  <div>📞 +237 xxx xxx xxx</div>
                  <div>✉️ support@camerbus.cm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getBooking, createPayment } from '@/services/api'
import type { Passenger } from '@/services/bookingService'

const router = useRouter()
const route = useRoute()

// Payment state
type Method = 'mtn' | 'orange' | 'card'
const selectedPaymentMethod = ref<Method | ''>('')
interface BookingPaymentData { bookingId?: number; totalPrice: number; seats?: string[]; passengers?: Array<{ fullName: string; phone: string }>; route?: { from?: string; to?: string; date?: string }; busType?: string }
const bookingData = ref<BookingPaymentData>({ totalPrice: 0 })

const paymentForm = ref({
  mtnNumber: '',
  orangeNumber: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: ''
})

// Computed
const canPay = computed(() => {
  if (!selectedPaymentMethod.value) return false
  switch (selectedPaymentMethod.value as Method) {
    case 'mtn':
      return paymentForm.value.mtnNumber.length >= 9
    case 'orange':
      return paymentForm.value.orangeNumber.length >= 9
    case 'card':
      return paymentForm.value.cardNumber.replace(/\s+/g, '').length >= 16 &&
             paymentForm.value.expiryDate.length >= 5 &&
             paymentForm.value.cvv.length >= 3 &&
             paymentForm.value.cardName.trim().length > 0
    default:
      return false
  }
})

// Methods
const getBusTypeName = (typeId: string) => {
  const types: Record<string, string> = { standard: 'Standard', vip: 'VIP', executive: 'Executive' }
  return types[typeId] || 'Standard'
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const calculateSubtotal = () => {
  return (bookingData.value.totalPrice || 0) - 500
}

const methodLabel = (m: Method) => m === 'mtn' ? 'MTN Mobile Money' : m === 'orange' ? 'Orange Money' : 'Card'

const processPayment = async () => {
  const method = (selectedPaymentMethod.value || '') as Method
  try {
    const id = Number(route.query.bookingId || bookingData.value.bookingId)
    if (!id) throw new Error('bookingId manquant')

    await createPayment({
      bookingId: id,
      amount: bookingData.value.totalPrice,
      method: methodLabel(method),
      status: 'paid',
      transactionId: 'TX-' + Date.now().toString(36).toUpperCase(),
      paymentDate: new Date().toISOString()
    })

    const fresh = await getBooking(id)

    const confirmationData = {
      bookingReference: fresh.reference,
      totalPrice: fresh.totalPrice,
      route: {
        from: fresh.schedule?.route?.departureCity?.name,
        to: fresh.schedule?.route?.destinationCity?.name,
        date: fresh.schedule?.departureAt || fresh.schedule?.departure_at
      },
      busType: fresh.schedule?.bus?.type,
      seats: Array.isArray(fresh.passengers) ? (fresh.passengers as Passenger[]).map((p) => p.seat) : [],
      passengers: Array.isArray(fresh.passengers) ? (fresh.passengers as Passenger[]).map((p) => ({ fullName: p.name, phone: p.phone })) : [],
    }

    localStorage.setItem('confirmationData', JSON.stringify(confirmationData))
    router.push({ name: 'Confirmation', query: { ref: String(fresh.reference) } })
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Erreur lors du paiement. Veuillez réessayer.')
  }
}

onMounted(async () => {
  try {
    const id = Number(route.query.bookingId)
    if (id) {
      const b = await getBooking(id)
      bookingData.value = {
        bookingId: b.id,
        totalPrice: b.totalPrice,
        seats: Array.isArray(b.passengers) ? (b.passengers as Passenger[]).map((p) => p.seat) : [],
        passengers: Array.isArray(b.passengers) ? (b.passengers as Passenger[]).map((p) => ({ fullName: p.name as string, phone: p.phone as string })) : [],
        route: {
          from: b.schedule?.route?.departureCity?.name,
          to: b.schedule?.route?.destinationCity?.name,
          date: b.schedule?.departureAt || b.schedule?.departure_at
        },
        busType: b.schedule?.bus?.type
      }
    } else {
      const storedData = localStorage.getItem('bookingData')
      if (storedData) {
        bookingData.value = JSON.parse(storedData)
      } else {
        router.push('/')
      }
    }
  } catch {
    router.push('/')
  }
})
</script>

<style scoped>
.payment-method {
  transition: all 0.2s ease;
}

.payment-method:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>
