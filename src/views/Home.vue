<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-bus-hero overflow-hidden">
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <div class="mb-4 animate-fade-in">
            <div class="text-xl md:text-2xl font-semibold text-white/90 mb-2">CamerBus</div>
            <h1 class="text-4xl md:text-6xl font-display font-bold text-white">
              Voyagez à travers le <span class="text-gold-300">Cameroun</span>
            </h1>
          </div>
          <p class="text-xl text-white/90 mb-12 max-w-3xl mx-auto animate-slide-up">
            Réservez vos billets de bus en toute simplicité. Confortable, sécurisé et abordable.
          </p>

          <!-- Search Form -->
          <div class="bg-white rounded-2xl shadow-large p-6 md:p-8 max-w-4xl mx-auto animate-slide-up">
            <form @submit.prevent="searchRoutes" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <!-- Departure -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-neutral-700">Départ</label>
                  <div class="relative">
                    <select
                      v-model="searchForm.departureCityId"
                      class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Choisir la ville</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </select>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                </div>

                <!-- Destination -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-neutral-700">Destination</label>
                  <div class="relative">
                    <select
                      v-model="searchForm.destinationCityId"
                      class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    >
                      <option value="">Choisir la ville</option>
                      <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
                    </select>
                    <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                  </div>
                </div>

                <!-- Date -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-neutral-700">Date de départ</label>
                  <input
                    v-model="searchForm.date"
                    type="date"
                    :min="today"
                    class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>

                <!-- Passengers -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-neutral-700">Passagers</label>
                  <select
                    v-model="searchForm.passengers"
                    class="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  >
                    <option v-for="num in 10" :key="num" :value="num">{{ num }} {{ num === 1 ? 'passager' : 'passagers' }}</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
              >
                <span class="flex items-center justify-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Rechercher des trajets</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Routes -->
    <section class="py-16 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-neutral-800 mb-4">
            Trajets populaires
          </h2>
          <p class="text-lg text-neutral-600">
            Découvrez nos destinations les plus demandées
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="route in popularRoutes"
            :key="route.id"
            class="bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300 overflow-hidden group cursor-pointer"
            @click="selectRoute(route)"
          >
            <div class="relative h-48 bg-gradient-to-br from-primary-400 to-primary-600">
              <div class="absolute inset-0 bg-black/20"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="text-xl font-semibold">{{ route.departure }} → {{ route.destination }}</h3>
                <p class="text-sm text-white/80">{{ route.duration }}</p>
              </div>
              <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span class="text-white font-semibold">{{ route.price }} FCFA</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-sm text-neutral-600">{{ route.rating }}/5</span>
                </div>
                <div class="text-sm text-neutral-500">
                  {{ route.frequency }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-neutral-800 mb-4">
            Pourquoi choisir CamerBus ?
          </h2>
          <p class="text-lg text-neutral-600">
            Votre confort et votre sécurité sont nos priorités
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.id"
            class="text-center group"
          >
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-neutral-800 mb-2">{{ feature.title }}</h3>
            <p class="text-neutral-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Payment Methods -->
    <section class="py-16 bg-neutral-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-display font-bold text-neutral-800 mb-4">
            Méthodes de paiement
          </h2>
          <p class="text-lg text-neutral-600">
            Payez facilement avec vos moyens de paiement préférés
          </p>
        </div>

        <div class="flex flex-wrap justify-center items-center gap-8">
          <div class="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <span class="text-gold-600 font-bold text-lg">MTN</span>
              </div>
              <span class="font-semibold text-neutral-800">MTN Mobile Money</span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <span class="text-orange-600 font-bold text-lg">OM</span>
              </div>
              <span class="font-semibold text-neutral-800">Orange Money</span>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-soft p-6 hover:shadow-medium transition-shadow duration-300">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span class="font-semibold text-neutral-800">Carte bancaire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { listCities } from '@/services/api'

const router = useRouter()

// Search form
const searchForm = ref({
  departureCityId: '' as number | string,
  destinationCityId: '' as number | string,
  date: '',
  passengers: 1
})

// Current date for min date
const today = computed(() => new Date().toISOString().split('T')[0])

// Cities from API
import type { City } from '@/types/api'
const cities = ref<City[]>([])

onMounted(async () => {
  try {
    cities.value = await listCities()
  } catch (e) {
    console.error('Erreur chargement villes', e)
  }
})

// Popular routes
interface PopularRoute { id: number; departure: string; destination: string; duration: string; price: string; rating: number; frequency: string }
const popularRoutes = ref<PopularRoute[]>([
  { id: 1, departure: 'Yaoundé', destination: 'Douala', duration: '3h 30min', price: '3,500', rating: 4.8, frequency: 'Toutes les heures' },
  { id: 2, departure: 'Douala', destination: 'Bamenda', duration: '4h 15min', price: '4,200', rating: 4.6, frequency: '6 trajets/jour' },
  { id: 3, departure: 'Yaoundé', destination: 'Bafoussam', duration: '4h 00min', price: '4,000', rating: 4.7, frequency: '8 trajets/jour' },
  { id: 4, departure: 'Douala', destination: 'Garoua', duration: '8h 30min', price: '8,500', rating: 4.5, frequency: '2 trajets/jour' },
  { id: 5, departure: 'Yaoundé', destination: 'Ngaoundéré', duration: '6h 45min', price: '6,800', rating: 4.4, frequency: '4 trajets/jour' },
  { id: 6, departure: 'Douala', destination: 'Kribi', duration: '2h 30min', price: '2,800', rating: 4.9, frequency: '5 trajets/jour' }
])

// Features
const features = ref([
  {
    id: 1,
    title: 'Confort garanti',
    description: 'Bus modernes avec climatisation et sièges confortables',
    icon: 'M5 13l4 4L19 7'
  },
  {
    id: 2,
    title: 'Sécurité maximale',
    description: 'Conducteurs expérimentés et bus régulièrement contrôlés',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
  },
  {
    id: 3,
    title: 'Prix abordables',
    description: 'Tarifs compétitifs pour tous les budgets',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
  },
  {
    id: 4,
    title: 'Support 24/7',
    description: 'Assistance client disponible à tout moment',
    icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l7.071 7.071-7.071 7.071L4.929 9.915 12 2.944z'
  }
])

// Methods
const searchRoutes = () => {
  if (!searchForm.value.departureCityId || !searchForm.value.destinationCityId || !searchForm.value.date) {
    alert('Veuillez remplir tous les champs de recherche')
    return
  }

  const fromCity = cities.value.find(c => c.id === Number(searchForm.value.departureCityId))
  const toCity = cities.value.find(c => c.id === Number(searchForm.value.destinationCityId))

  router.push({
    name: 'Search',
    query: {
      fromId: String(searchForm.value.departureCityId),
      toId: String(searchForm.value.destinationCityId),
      from: fromCity?.name,
      to: toCity?.name,
      date: searchForm.value.date,
      passengers: searchForm.value.passengers
    }
  })
}

const selectRoute = (route: PopularRoute) => {
  const fromCity = cities.value.find(c => c.name.toLowerCase() === route.departure.toLowerCase())
  const toCity = cities.value.find(c => c.name.toLowerCase() === route.destination.toLowerCase())
  searchForm.value.departureCityId = fromCity?.id || ''
  searchForm.value.destinationCityId = toCity?.id || ''
  searchForm.value.date = today.value

  router.push({
    name: 'Search',
    query: {
      fromId: fromCity?.id?.toString(),
      toId: toCity?.id?.toString(),
      from: route.departure,
      to: route.destination,
      date: today.value,
      passengers: 1
    }
  })
}
</script>
