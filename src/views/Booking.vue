<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Progress Steps -->
    <div class="bg-white shadow-sm">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-center">
          <div class="flex items-center space-x-4">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="flex items-center"
            >
              <div
                :class="[
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                  currentStep >= step.id
                    ? 'bg-primary-600 border-primary-600 text-white'
                    : 'bg-white border-neutral-300 text-neutral-500'
                ]"
              >
                <svg v-if="currentStep > step.id" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span v-else class="text-sm font-medium">{{ step.id }}</span>
              </div>
              <span class="ml-2 text-sm font-medium text-neutral-700">{{ step.name }}</span>
              <svg v-if="index < steps.length - 1" class="w-5 h-5 text-neutral-300 mx-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Journey Info Header -->
      <div class="bg-white rounded-xl shadow-soft p-6 mb-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="mb-4 lg:mb-0">
            <h1 class="text-2xl font-display font-bold text-neutral-800 mb-2">Réservation CamerBus</h1>
            <div class="flex items-center space-x-4 text-sm text-neutral-600">
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>{{ route.query.from }} → {{ route.query.to }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ formatDate(route.query.date as string) }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{{ route.query.passengers }} passager{{ Number(route.query.passengers) > 1 ? 's' : '' }}</span>
              </div>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-primary-600">{{ totalPrice.toLocaleString() }} FCFA</div>
            <div class="text-sm text-neutral-600">Prix total</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">

          <!-- Step 1: Seat Selection -->
          <div v-if="currentStep === 1" class="bg-white rounded-xl shadow-soft p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Sélection des places</h2>

            <!-- Bus Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-neutral-700 mb-3">Type de bus</label>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  v-for="type in busTypes"
                  :key="type.id"
                  @click="selectedBusType = type.id"
                  :class="[
                    'border-2 rounded-lg p-4 cursor-pointer transition-all duration-200',
                    selectedBusType === type.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-neutral-200 hover:border-primary-300'
                  ]"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-neutral-800">{{ type.name }}</span>
                    <div
                      :class="[
                        'w-4 h-4 rounded-full',
                        type.id === 'standard' ? 'bg-primary-500' :
                        type.id === 'vip' ? 'bg-gold-500' : 'bg-purple-500'
                      ]"
                    ></div>
                  </div>
                  <div class="text-lg font-bold text-neutral-800 mb-1">+{{ type.extraPrice.toLocaleString() }} FCFA</div>
                  <div class="text-sm text-neutral-600">{{ type.description }}</div>
                </div>
              </div>
            </div>

            <!-- Bus Layout -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-medium text-neutral-800">Plan du bus</h3>
                <div class="flex items-center space-x-4 text-sm">
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-white border-2 border-neutral-300 rounded"></div>
                    <span>Libre</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-primary-500 rounded"></div>
                    <span>Sélectionné</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Occupé</span>
                  </div>
                </div>
              </div>

              <!-- Bus Visual -->
              <div class="bg-neutral-100 rounded-xl p-6">
                <div class="max-w-md mx-auto">
                  <!-- Driver Section -->
                  <div class="bg-neutral-800 rounded-t-lg p-3 mb-4">
                    <div class="flex justify-between items-center">
                      <span class="text-white text-sm">Conducteur</span>
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  <!-- Seats Grid -->
                  <div class="space-y-3">
                    <div
                      v-for="row in seatLayout"
                      :key="row.id"
                      class="flex justify-between items-center"
                    >
                      <!-- Left Seats -->
                      <div class="flex space-x-2">
                        <div
                          v-for="seat in row.leftSeats"
                          :key="seat.number"
                          @click="toggleSeat(seat.number)"
                          :class="getSeatClass(seat)"
                          class="seat"
                        >
                          {{ seat.number }}
                        </div>
                      </div>

                      <!-- Aisle -->
                      <div class="w-8 text-center text-xs text-neutral-500">
                        {{ row.id }}
                      </div>

                      <!-- Right Seats -->
                      <div class="flex space-x-2">
                        <div
                          v-for="seat in row.rightSeats"
                          :key="seat.number"
                          @click="toggleSeat(seat.number)"
                          :class="getSeatClass(seat)"
                          class="seat"
                        >
                          {{ seat.number }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Bus Bottom -->
                  <div class="bg-neutral-300 rounded-b-lg p-2 mt-4 text-center text-sm text-neutral-600">
                    Sortie de secours
                  </div>
                </div>
              </div>

              <!-- Selected Seats Summary -->
              <div v-if="selectedSeats.length > 0" class="mt-4 p-4 bg-primary-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-medium text-primary-800">Places sélectionnées: </span>
                    <span class="text-primary-700">{{ selectedSeats.join(', ') }}</span>
                  </div>
                  <div class="text-primary-800 font-medium">
                    {{ selectedSeats.length }}/{{ route.query.passengers }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Continue Button -->
            <div class="flex justify-end">
              <button
                @click="nextStep"
                :disabled="selectedSeats.length !== passagerCount"
                class="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Continuer
              </button>
            </div>
          </div>

          <!-- Step 2: Passenger Information -->
          <div v-if="currentStep === 2" class="bg-white rounded-xl shadow-soft p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Informations des passagers</h2>

            <div class="space-y-6">
              <div
                v-for="(passenger, index) in passengerInfo"
                :key="index"
                class="passenger-form"
              >
                <h3 class="font-medium text-neutral-800 mb-4 flex items-center">
                  <span class="bg-primary-100 text-primary-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {{ index + 1 }}
                  </span>
                  Passager {{ index + 1 }} - Place {{ selectedSeats[index] }}
                </h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Nom complet *</label>
                    <input
                      v-model="passenger.fullName"
                      type="text"
                      placeholder="Nom et prénom"
                      :class="[
                        'w-full px-4 py-3 border rounded-lg transition-colors',
                        passenger.fullName ? 'border-primary-300 bg-primary-50' : 'border-neutral-300'
                      ]"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Téléphone *</label>
                    <input
                      v-model="passenger.phone"
                      type="tel"
                      placeholder="+237 xxx xxx xxx"
                      :class="[
                        'w-full px-4 py-3 border rounded-lg transition-colors',
                        passenger.phone ? 'border-primary-300 bg-primary-50' : 'border-neutral-300'
                      ]"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                    <input
                      v-model="passenger.email"
                      type="email"
                      placeholder="email@exemple.com"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Pièce d'identité</label>
                    <select v-model="passenger.idType" class="w-full px-4 py-3 border border-neutral-300 rounded-lg">
                      <option value="">Choisir le type</option>
                      <option value="cni">Carte Nationale d'Identité</option>
                      <option value="passport">Passeport</option>
                      <option value="permit">Permis de conduire</option>
                    </select>
                  </div>

                  <div v-if="passenger.idType" class="md:col-span-2">
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Numéro de la pièce</label>
                    <input
                      v-model="passenger.idNumber"
                      type="text"
                      placeholder="Numéro de la pièce d'identité"
                      class="w-full px-4 py-3 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between mt-8">
              <button
                @click="previousStep"
                class="px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                Retour
              </button>
              <button
                @click="nextStep"
                :disabled="!isPassengerInfoValid"
                class="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Continuer
              </button>
            </div>
          </div>

          <!-- Step 3: Summary -->
          <div v-if="currentStep === 3" class="bg-white rounded-xl shadow-soft p-6">
            <h2 class="text-xl font-semibold text-neutral-800 mb-6">Récapitulatif de la réservation</h2>

            <!-- Trip Summary -->
            <div class="bg-neutral-50 rounded-lg p-4 mb-6">
              <h3 class="font-medium text-neutral-800 mb-3">Détails du voyage</h3>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-neutral-600">Trajet:</span>
                  <span class="ml-2 font-medium">{{ route.query.from }} → {{ route.query.to }}</span>
                </div>
                <div>
                  <span class="text-neutral-600">Date:</span>
                  <span class="ml-2 font-medium">{{ formatDate(typeof route.query.date === 'string' ? route.query.date : '') }}</span>
                </div>
                <div>
                  <span class="text-neutral-600">Places:</span>
                  <span class="ml-2 font-medium">{{ selectedSeats.join(', ') }}</span>
                </div>
                <div>
                  <span class="text-neutral-600">Type de bus:</span>
                  <span class="ml-2 font-medium">{{ getBusTypeName(selectedBusType) }}</span>
                </div>
              </div>
            </div>

            <!-- Passengers Summary -->
            <div class="mb-6">
              <h3 class="font-medium text-neutral-800 mb-3">Passagers</h3>
              <div class="space-y-3">
                <div
                  v-for="(passenger, index) in passengerInfo"
                  :key="index"
                  class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                >
                  <div>
                    <span class="font-medium">{{ passenger.fullName }}</span>
                    <span class="text-neutral-600 ml-2">- Place {{ selectedSeats[index] }}</span>
                  </div>
                  <span class="text-sm text-neutral-600">{{ passenger.phone }}</span>
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <button
                @click="previousStep"
                class="px-6 py-3 border border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                Retour
              </button>
              <button
                @click="proceedToPayment"
                class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Procéder au paiement
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Price Breakdown -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-800 mb-4">Détail des prix</h3>

            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-neutral-600">{{ route.query.passengers }} billet{{ passagerCount > 1 ? 's' : '' }}</span>
                <span class="font-medium">{{ (basePriceRef * passagerCount).toLocaleString() }} FCFA</span>
              </div>

              <div v-if="selectedBusType !== 'standard'" class="flex justify-between">
                <span class="text-neutral-600">Supplément {{ getBusTypeName(selectedBusType) }}</span>
                <span class="font-medium">{{ (getBusTypePrice(selectedBusType) * passagerCount).toLocaleString() }} FCFA</span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-neutral-600">Frais de service</span>
                <span class="font-medium">{{ serviceFee.toLocaleString() }} FCFA</span>
              </div>

              <hr class="my-3">

              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span class="text-primary-600">{{ totalPrice.toLocaleString() }} FCFA</span>
              </div>
            </div>
          </div>

          <!-- Help Card -->
          <div class="bg-primary-50 rounded-xl p-6">
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 class="font-medium text-primary-800 mb-2">Besoin d'aide ?</h4>
                <p class="text-sm text-primary-700 mb-3">Notre équipe est disponible pour vous assister</p>
                <button class="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Contacter le support
                </button>
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
import { useRoute, useRouter } from 'vue-router'
import { getSchedule, createBooking } from '@/services/api'
import { authService } from '@/services/authService'

const route = useRoute()
const router = useRouter()

const scheduleId = computed(() => Number(route.query.routeId) || Number(route.query.scheduleId) || 0)

const passagerCount =computed(() => {
  const val  = route.query.Passagers;
  if (Array.isArray(val)) return parseInt(val[0] || '0');
  if (typeof val === 'string') return parseInt(val);
  return 0;
});
// Steps
const steps = ref([
  { id: 1, name: 'Sélection des places' },
  { id: 2, name: 'Informations passagers' },
  { id: 3, name: 'Récapitulatif' }
])

const currentStep = ref(1)

// Bus Types
const busTypes = ref([
  {
    id: 'standard',
    name: 'Standard',
    extraPrice: 0,
    description: 'Confort de base, sièges standards'
  },
  {
    id: 'vip',
    name: 'VIP',
    extraPrice: 2000,
    description: 'Sièges plus larges, climatisation renforcée'
  },
  {
    id: 'executive',
    name: 'Executive',
    extraPrice: 4000,
    description: 'Sièges inclinables, service premium'
  }
])

const selectedBusType = ref('standard')

// Pricing
const basePriceRef = ref<number>(Number(route.query.price) || 0)
const serviceFee = 500

// Seat Layout (built from backend data)
interface SeatCell { number: number; status: 'available' | 'selected' | 'occupied' }
interface SeatRow { id: string; leftSeats: SeatCell[]; rightSeats: SeatCell[] }
const seatLayout = ref<SeatRow[]>([])

const selectedSeats = ref<number[]>([])
const passengerInfo = ref<Array<{
  fullName: string
  phone: string
  email: string
  idType: string
  idNumber: string
}>>([])

// Computed
const totalPrice = computed(() => {
  const busTypePrice = getBusTypePrice(selectedBusType.value)
  const passengers = parseInt(route.query.passengers as string) || 1
  return (basePriceRef.value + busTypePrice) * passengers + serviceFee
})

const isPassengerInfoValid = computed(() => {
  return passengerInfo.value.every(p => p.fullName.trim() && p.phone.trim())
})

// Methods
const getSeatClass = (seat: SeatCell) => {
  const baseClass = 'w-10 h-10 border-2 rounded cursor-pointer flex items-center justify-center text-xs font-medium transition-all duration-200'
  if (seat.status === 'occupied') return baseClass + ' bg-red-500 border-red-500 text-white cursor-not-allowed'
  if (selectedSeats.value.includes(seat.number)) return baseClass + ' bg-primary-500 border-primary-500 text-white scale-110'
  return baseClass + ' bg-white border-neutral-300 text-neutral-600 hover:border-primary-400 hover:scale-105'
}

const toggleSeat = (seatNumber: number) => {
  const seat = seatLayout.value.flatMap(row => [...row.leftSeats, ...row.rightSeats]).find(s => s.number === seatNumber)
  if (seat?.status === 'occupied') return
  const seatIndex = selectedSeats.value.indexOf(seatNumber)
  const maxPassengers = parseInt(route.query.passengers as string) || 1
  if (seatIndex > -1) selectedSeats.value.splice(seatIndex, 1)
  else if (selectedSeats.value.length < maxPassengers) selectedSeats.value.push(seatNumber)
}

const getBusTypeName = (typeId: string) => busTypes.value.find(t => t.id === typeId)?.name || 'Standard'
const getBusTypePrice = (typeId: string) => busTypes.value.find(t => t.id === typeId)?.extraPrice || 0

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

function buildSeatLayout(capacity: number, occupied: Set<number>) {
  const rows: SeatRow[] = []
  let current = 1
  let rowIndex = 0
  while (current <= capacity) {
    const left: SeatCell[] = []
    const right: SeatCell[] = []
    for (let i = 0; i < 2 && current <= capacity; i++, current++) {
      left.push({ number: current, status: occupied.has(current) ? 'occupied' : 'available' })
    }
    for (let i = 0; i < 2 && current <= capacity; i++, current++) {
      right.push({ number: current, status: occupied.has(current) ? 'occupied' : 'available' })
    }
    rows.push({ id: String.fromCharCode('A'.charCodeAt(0) + rowIndex), leftSeats: left, rightSeats: right })
    rowIndex++
  }
  return rows
}

async function loadSchedule() {
  if (!scheduleId.value) return
  try {
    const s = await getSchedule(scheduleId.value)
    basePriceRef.value = Number((s.price ?? s.route?.basePrice ?? basePriceRef.value ?? 0))
    const capacity = Number(s.bus?.capacity || 40)
    const occupied = new Set<number>()
    if (Array.isArray(s.bookings)) {
      for (const b of s.bookings) {
        if (Array.isArray(b.passengers)) {
          for (const p of b.passengers) {
            const num = Number(p.seat)
            if (!Number.isNaN(num)) occupied.add(num)
          }
        }
      }
    }
    seatLayout.value = buildSeatLayout(capacity, occupied)
  } catch (e) {
    console.error('Erreur chargement horaire', e)
    seatLayout.value = buildSeatLayout(40, new Set())
  }
}

const nextStep = () => { if (currentStep.value < 3) currentStep.value++ }
const previousStep = () => { if (currentStep.value > 1) currentStep.value-- }

const proceedToPayment = async () => {
  const expected = parseInt(route.query.passengers as string) || 1
  if (selectedSeats.value.length !== expected || !isPassengerInfoValid.value) return
  const user = authService.getCurrentUser?.()
  if (!user) {
    alert('Veuillez vous connecter pour continuer')
    router.push({ name: 'Login' })
    return
  }
  try {
    const payload = {
      userId: Number((user as { id: string | number }).id),
      scheduleId: scheduleId.value as number,
      passengers: passengerInfo.value.map((p, idx) => ({
        fullName: p.fullName,
        phone: p.phone,
        email: p.email || undefined,
        idType: p.idType || undefined,
        idNumber: p.idNumber || undefined,
        seat: String(selectedSeats.value[idx])
      }))
    }
    const booking = await createBooking(payload)
    const bookingData = {
      route: { from: route.query.from, to: route.query.to, date: route.query.date, passengers: route.query.passengers },
      seats: selectedSeats.value,
      busType: selectedBusType.value,
      passengers: passengerInfo.value,
      totalPrice: Number(booking?.totalPrice ?? totalPrice.value),
      bookingId: booking?.id,
      reference: booking?.reference
    }
    localStorage.setItem('bookingData', JSON.stringify(bookingData))
    router.push({ name: 'Payment', query: { bookingId: String(booking.id) } })
  } catch {
    alert('Erreur lors de la création de la réservation')
  }
}

onMounted(() => {
  const numPassengers = parseInt(route.query.passengers as string) || 1
  for (let i = 0; i < numPassengers; i++) {
    passengerInfo.value.push({ fullName: '', phone: '', email: '', idType: '', idNumber: '' })
  }
  loadSchedule()
})
</script>

<style scoped>
.seat {
  transition: all 0.2s ease;
}

.seat:hover {
  transform: scale(1.05);
}

.passenger-form {
  @apply bg-neutral-50 rounded-lg p-6 border border-neutral-200;
}

.passenger-form:nth-child(even) {
  @apply bg-primary-50 border-primary-200;
}
</style>
