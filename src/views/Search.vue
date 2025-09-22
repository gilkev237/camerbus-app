<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Search Header -->
    <div class="bg-white shadow-soft">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div class="flex-1">
            <h1 class="text-2xl font-display font-bold text-neutral-800">
              Résultats de recherche
            </h1>
            <p class="text-neutral-600 mt-1">
              {{ filteredRoutes.length }} trajet{{ filteredRoutes.length > 1 ? 's' : '' }} trouvé{{ filteredRoutes.length > 1 ? 's' : '' }}
              {{ searchQuery.from && searchQuery.to ? `de ${searchQuery.from} à ${searchQuery.to}` : '' }}
            </p>
          </div>

          <!-- Quick Search -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <select v-model="sortBy" class="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
                <option value="price">Prix croissant</option>
                <option value="time">Heure de départ</option>
                <option value="duration">Durée</option>
              </select>
            </div>
            <button
              @click="showFilters = !showFilters"
              class="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Filtres
            </button>
          </div>
        </div>

        <!-- Filters Panel -->
        <div v-if="showFilters" class="mt-6 p-4 bg-neutral-50 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Heure de départ</label>
              <select v-model="filters.timeSlot" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Toute la journée</option>
                <option value="morning">Matin (6h-12h)</option>
                <option value="afternoon">Après-midi (12h-18h)</option>
                <option value="evening">Soir (18h-24h)</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Prix maximum</label>
              <input
                v-model="filters.maxPrice"
                type="number"
                placeholder="FCFA"
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Type de bus</label>
              <select v-model="filters.busType" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Tous types</option>
                <option value="standard">Standard</option>
                <option value="vip">VIP</option>
                <option value="executive">Executive</option>
              </select>
            </div>
            <div class="flex items-end">
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
              >
                Effacer les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="space-y-6">
        <div
          v-for="route in filteredRoutes"
          :key="route.id"
          class="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden"
        >
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <!-- Route Info -->
              <div class="flex-1">
                <div class="flex items-center space-x-4 mb-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-neutral-800">{{ route.departureTime }}</div>
                    <div class="text-sm text-neutral-600">{{ route.departure }}</div>
                  </div>

                  <div class="flex-1 flex items-center">
                    <div class="w-full relative">
                      <div class="border-t-2 border-neutral-300"></div>
                      <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div class="text-center">
                    <div class="text-2xl font-bold text-neutral-800">{{ route.arrivalTime }}</div>
                    <div class="text-sm text-neutral-600">{{ route.destination }}</div>
                  </div>
                </div>

                <div class="flex items-center space-x-6 text-sm text-neutral-600">
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ route.duration }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <div class="w-3 h-3 rounded-full" :class="getBusTypeColor(route.busType)"></div>
                    <span>{{ route.busType }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{{ route.rating }}/5</span>
                  </div>
                </div>
              </div>

              <!-- Price and Action -->
              <div class="mt-4 lg:mt-0 lg:ml-8 flex flex-col items-end">
                <div class="text-right mb-4">
                  <div class="text-3xl font-bold text-primary-600">{{ route.price }}</div>
                  <div class="text-sm text-neutral-600">FCFA / personne</div>
                  <div v-if="route.availability < 10" class="text-xs text-secondary-600 mt-1">
                    Plus que {{ route.availability }} places
                  </div>
                </div>

                <button
                  @click="selectRoute(route)"
                  class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 min-w-[120px]"
                  :disabled="route.availability === 0"
                >
                  {{ route.availability === 0 ? 'Complet' : 'Réserver' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div v-if="filteredRoutes.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.469-.898-6.069-2.375M15 15.803c.633-.272 1.256-.575 1.872-.897M9 15.803c-.633-.272-1.256-.575-1.872-.897M12 15c-2.34 0-4.469-.898-6.069-2.375" />
          </svg>
          <h3 class="text-lg font-semibold text-neutral-800 mb-2">Aucun trajet trouvé</h3>
          <p class="text-neutral-600 mb-4">Essayez de modifier vos critères de recherche</p>
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Nouvelle recherche
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { searchSchedules } from '@/services/api'

const route = useRoute()
const router = useRouter()

// Search state
const showFilters = ref(false)
const sortBy = ref('time')

// Search query from URL
const searchQuery = ref({
  fromId: Number(route.query.fromId) || undefined,
  toId: Number(route.query.toId) || undefined,
  from: (route.query.from as string) || '',
  to: (route.query.to as string) || '',
  date: (route.query.date as string) || '',
  passengers: Number(route.query.passengers) || 1
})

// Filters
const filters = ref({
  timeSlot: '',
  maxPrice: null as number | null,
  busType: ''
})

import type { Schedule } from '@/types/api'

// Results from backend
interface RouteCard {
  id: number
  departure: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: string
  numericPrice: number
  busType: string
  rating: number
  availability: number
  company: string
}
const routes = ref<RouteCard[]>([])

async function load() {
  if (!searchQuery.value.fromId || !searchQuery.value.toId) return
  try {
    const data = await searchSchedules({
      departureCityId: searchQuery.value.fromId,
      destinationCityId: searchQuery.value.toId,
      date: searchQuery.value.date,
    })
    routes.value = (data as Schedule[]).map((s) => ({
      id: s.id,
      departure: s.route?.departureCity?.name || searchQuery.value.from,
      destination: s.route?.destinationCity?.name || searchQuery.value.to,
      departureTime: new Date(s.departureAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: new Date(s.arrivalAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: calcDuration(s.departureAt, s.arrivalAt),
      price: (s.price ?? s.route?.basePrice ?? 0).toLocaleString('en-US'),
      numericPrice: Number(s.price ?? s.route?.basePrice ?? 0),
      busType: s.bus?.type || 'Standard',
      rating: 4.7,
      availability: Math.max(0, (s.bus?.capacity || 40) - 5),
      company: 'CamerBus',
    }))
  } catch (e) {
    console.error('Erreur recherche trajets', e)
    routes.value = []
  }
}

function calcDuration(start: string, end: string) {
  const a = new Date(start).getTime()
  const b = new Date(end).getTime()
  const mins = Math.max(0, Math.round((b - a) / 60000))
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}h ${m.toString().padStart(2,'0')}min`
}

// Computed filtered routes
const filteredRoutes = computed(() => {
  let filtered = [...routes.value]

  // Filter by route if specified
  if (searchQuery.value.from && searchQuery.value.to) {
    filtered = filtered.filter(r =>
      r.departure.toLowerCase() === searchQuery.value.from.toLowerCase() &&
      r.destination.toLowerCase() === searchQuery.value.to.toLowerCase()
    )
  }

  // Apply filters
  if (filters.value.timeSlot) {
    filtered = filtered.filter(r => {
      const hour = parseInt(r.departureTime.split(':')[0])
      switch (filters.value.timeSlot) {
        case 'morning': return hour >= 6 && hour < 12
        case 'afternoon': return hour >= 12 && hour < 18
        case 'evening': return hour >= 18 || hour < 6
        default: return true
      }
    })
  }

  if (filters.value.maxPrice) {
    filtered = filtered.filter(r => r.numericPrice <= filters.value.maxPrice!)
  }

  if (filters.value.busType) {
    filtered = filtered.filter(r => r.busType.toLowerCase() === filters.value.busType.toLowerCase())
  }

  // Sort results
  switch (sortBy.value) {
    case 'price':
      filtered.sort((a, b) => a.numericPrice - b.numericPrice)
      break
    case 'time':
      filtered.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
      break
    case 'duration':
      filtered.sort((a, b) => a.duration.localeCompare(b.duration))
      break
  }

  return filtered
})

// Methods
const getBusTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'vip': return 'bg-gold-500'
    case 'executive': return 'bg-purple-500'
    default: return 'bg-primary-500'
  }
}

const clearFilters = () => {
  filters.value = {
    timeSlot: '',
    maxPrice: null,
    busType: ''
  }
}

const selectRoute = (selectedRoute: RouteCard) => {
  router.push({
    name: 'Booking',
    query: {
      routeId: selectedRoute.id,
      from: selectedRoute.departure,
      to: selectedRoute.destination,
      date: searchQuery.value.date,
      passengers: searchQuery.value.passengers,
      price: selectedRoute.numericPrice
    }
  })
}

onMounted(() => {
  load()
})
</script>
