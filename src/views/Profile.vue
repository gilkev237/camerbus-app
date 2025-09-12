<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header Profile -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-primary-600">{{ userInitials }}</span>
            </div>
            <div>
              <h1 class="text-2xl font-display font-bold text-neutral-800">{{ userData.fullName }}</h1>
              <p class="text-neutral-600">Membre CamerBus depuis {{ memberSince }}</p>
            </div>
          </div>
          <div class="mt-4 md:mt-0 flex items-center space-x-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-primary-600">{{ loyaltyPoints }}</div>
              <div class="text-sm text-neutral-600">Points fidélité</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gold-600">{{ userData.level }}</div>
              <div class="text-sm text-neutral-600">Niveau</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <div class="border-b border-neutral-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              ]"
            >
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
                </svg>
                <span>{{ tab.name }}</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <!-- Dashboard Tab -->
      <div v-if="activeTab === 'dashboard'" class="space-y-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-soft p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ stats.totalTrips }}</div>
                <div class="text-sm text-neutral-600">Voyages effectués</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-soft p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ stats.totalSpent.toLocaleString() }}</div>
                <div class="text-sm text-neutral-600">FCFA dépensés</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-soft p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ stats.favoriteDest }}</div>
                <div class="text-sm text-neutral-600">Destination préférée</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-soft p-6">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ loyaltyPoints }}</div>
                <div class="text-sm text-neutral-600">Points fidélité</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity & Loyalty Program -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Bookings -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Réservations récentes</h3>
            <div class="space-y-4">
              <div 
                v-for="booking in recentBookings" 
                :key="booking.id"
                class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
              >
                <div class="flex items-center space-x-4">
                  <div 
                    :class="[
                      'w-3 h-3 rounded-full',
                      booking.status === 'completed' ? 'bg-green-500' :
                      booking.status === 'upcoming' ? 'bg-blue-500' :
                      booking.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                    ]"
                  ></div>
                  <div>
                    <div class="font-medium text-neutral-800">{{ booking.route }}</div>
                    <div class="text-sm text-neutral-600">{{ formatDate(booking.date) }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="font-medium text-neutral-800">{{ booking.price.toLocaleString() }} FCFA</div>
                  <div class="text-xs text-neutral-500 capitalize">{{ getStatusText(booking.status) }}</div>
                </div>
              </div>
            </div>
            <router-link 
              to="#" 
              @click.prevent="activeTab = 'bookings'"
              class="block w-full text-center mt-4 py-2 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg transition-colors duration-200"
            >
              Voir toutes les réservations
            </router-link>
          </div>

          <!-- Loyalty Program -->
          <div class="bg-gradient-to-br from-primary-50 to-gold-50 rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Programme de fidélité</h3>
            
            <!-- Current Level -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-neutral-700">Niveau {{ userData.level }}</span>
                <span class="text-sm text-neutral-600">{{ loyaltyPoints }}/{{ nextLevelPoints }} points</span>
              </div>
              <div class="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  class="bg-gradient-to-r from-primary-500 to-gold-500 h-2 rounded-full transition-all duration-300"
                  :style="{ width: loyaltyProgressPercent + '%' }"
                ></div>
              </div>
              <div class="text-xs text-neutral-600 mt-1">
                Plus que {{ nextLevelPoints - loyaltyPoints }} points pour le niveau {{ getNextLevel() }}
              </div>
            </div>

            <!-- Benefits -->
            <div class="space-y-3">
              <h4 class="font-medium text-neutral-800">Avantages actuels :</h4>
              <div class="space-y-2">
                <div 
                  v-for="benefit in currentBenefits" 
                  :key="benefit"
                  class="flex items-center space-x-2 text-sm text-neutral-700"
                >
                  <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{{ benefit }}</span>
                </div>
              </div>
            </div>

            <!-- Redeem Points -->
            <button class="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200">
              Utiliser mes points
            </button>
          </div>
        </div>
      </div>

      <!-- Bookings Tab -->
      <div v-if="activeTab === 'bookings'" class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-4">Filtrer les réservations</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Statut</label>
              <select v-model="bookingFilters.status" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Tous les statuts</option>
                <option value="upcoming">À venir</option>
                <option value="completed">Terminé</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Période</label>
              <select v-model="bookingFilters.period" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Toute période</option>
                <option value="this-month">Ce mois</option>
                <option value="last-month">Mois dernier</option>
                <option value="this-year">Cette année</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Destination</label>
              <select v-model="bookingFilters.destination" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Toutes destinations</option>
                <option value="Douala">Douala</option>
                <option value="Bamenda">Bamenda</option>
                <option value="Bafoussam">Bafoussam</option>
              </select>
            </div>
            <div class="flex items-end">
              <button 
                @click="clearFilters"
                class="w-full py-2 px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-lg transition-colors duration-200"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        <!-- Bookings List -->
        <div class="space-y-4">
          <div 
            v-for="booking in filteredBookings" 
            :key="booking.id"
            class="bg-white rounded-xl shadow-soft p-6"
          >
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-4 mb-4">
                  <div 
                    :class="[
                      'px-3 py-1 rounded-full text-sm font-medium',
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    ]"
                  >
                    {{ getStatusText(booking.status) }}
                  </div>
                  <span class="text-sm text-neutral-600">Réf: {{ booking.reference }}</span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span class="text-neutral-600">Trajet:</span>
                    <div class="font-medium">{{ booking.route }}</div>
                  </div>
                  <div>
                    <span class="text-neutral-600">Date & Heure:</span>
                    <div class="font-medium">{{ formatDateTime(booking.date) }}</div>
                  </div>
                  <div>
                    <span class="text-neutral-600">Places:</span>
                    <div class="font-medium">{{ booking.seats.join(', ') }}</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-4 lg:mt-0 lg:ml-8 flex flex-col items-end space-y-2">
                <div class="text-xl font-bold text-neutral-800">{{ booking.price.toLocaleString() }} FCFA</div>
                <div v-if="booking.status === 'cancelled' && booking.refundAmount" class="text-sm text-green-700">Remboursement: {{ booking.refundAmount.toLocaleString() }} FCFA</div>
                <div class="flex space-x-2">
                  <button
                    v-if="booking.status === 'upcoming' || booking.status === 'completed'"
                    @click="downloadBooking(booking)"
                    class="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Télécharger le billet
                  </button>
                  <button
                    v-if="booking.status === 'upcoming'"
                    @click="cancelBooking(booking)"
                    :disabled="isCancellingRef === booking.reference"
                    class="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    {{ isCancellingRef === booking.reference ? 'Annulation...' : 'Annuler' }}
                  </button>
                  <button
                    v-if="booking.status === 'completed'"
                    class="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    Réserver à nouveau
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Personal Info Tab -->
      <div v-if="activeTab === 'personal'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Informations personnelles</h3>
          
          <form @submit.prevent="updatePersonalInfo" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Nom complet</label>
                <input 
                  v-model="editableUserData.fullName"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input 
                  v-model="editableUserData.email"
                  type="email"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Téléphone</label>
                <input 
                  v-model="editableUserData.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Date de naissance</label>
                <input 
                  v-model="editableUserData.birthDate"
                  type="date"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Genre</label>
                <select 
                  v-model="editableUserData.gender"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Choisir</option>
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                  <option value="Other">Autre</option>
                </select>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Ville</label>
                <input 
                  v-model="editableUserData.city"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div class="flex justify-end space-x-4">
              <button 
                type="button"
                @click="resetPersonalInfo"
                class="px-6 py-3 border border-neutral-300 text-neutral-700 font-medium rounded-lg hover:bg-neutral-50 transition-colors duration-200"
              >
                Annuler
              </button>
              <button 
                type="submit"
                class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>

        <!-- Emergency Contact -->
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Contact d'urgence</h3>
          
          <form @submit.prevent="updateEmergencyContact" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Nom du contact</label>
                <input 
                  v-model="emergencyContact.name"
                  type="text"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Téléphone</label>
                <input 
                  v-model="emergencyContact.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Relation</label>
                <select 
                  v-model="emergencyContact.relation"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Choisir</option>
                  <option value="parent">Parent</option>
                  <option value="conjoint">Conjoint(e)</option>
                  <option value="enfant">Enfant</option>
                  <option value="ami">Ami(e)</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>
            
            <div class="flex justify-end">
              <button 
                type="submit"
                class="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="space-y-6">
        <!-- Notifications -->
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Préférences de notification</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-neutral-800">Confirmations de réservation</div>
                <div class="text-sm text-neutral-600">Recevoir une confirmation par email/SMS</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.emailConfirmation" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-neutral-800">Rappels de voyage</div>
                <div class="text-sm text-neutral-600">Rappel 24h avant le départ</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.travelReminders" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-neutral-800">Promotions et offres</div>
                <div class="text-sm text-neutral-600">Recevoir les offres spéciales</div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input v-model="settings.promotions" type="checkbox" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Sécurité</h3>
          
          <div class="space-y-4">
            <button class="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-neutral-800">Changer le mot de passe</div>
                  <div class="text-sm text-neutral-600">Dernière modification : il y a 3 mois</div>
                </div>
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
            <button class="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-neutral-800">Authentification à deux facteurs</div>
                  <div class="text-sm text-neutral-600">Sécurisez votre compte avec 2FA</div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="text-sm text-red-600">Désactivé</span>
                  <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Account Actions -->
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Actions du compte</h3>
          
          <div class="space-y-4">
            <button class="w-full text-left p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors duration-200">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium text-neutral-800">Télécharger mes données</div>
                  <div class="text-sm text-neutral-600">Exporter toutes vos données personnelles</div>
                </div>
                <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </button>
            
            <button class="w-full text-left p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200 text-red-600">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">Supprimer mon compte</div>
                  <div class="text-sm">Action irréversible</div>
                </div>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { downloadBookingPdfAsync } from '@/utils/pdf'
import { getUser, updateUser, getUserBookings, cancelBooking as apiCancelBooking } from '@/services/api'
import { authService } from '@/services/authService'

// State
const activeTab = ref('dashboard')

const userData = ref({
  id: 1,
  fullName: '',
  email: '',
  phone: '',
  birthDate: '',
  gender: '' as 'M' | 'F' | 'Other' | '',
  city: '',
  level: 'Bronze',
  joinDate: new Date().toISOString().split('T')[0],
  loyaltyPoints: 0
})

const editableUserData = ref({ ...userData.value })

const emergencyContact = ref({
  name: '',
  phone: '',
  relation: ''
})

const settings = ref({
  emailConfirmation: true,
  travelReminders: true,
  promotions: false
})

const loyaltyPoints = ref(0)
const nextLevelPoints = ref(5000)

const stats = ref({
  totalTrips: 0,
  totalSpent: 0,
  favoriteDest: ''
})

const bookingFilters = ref({
  status: '',
  period: '',
  destination: ''
})

// Tabs configuration
const tabs = ref([
  {
    id: 'dashboard',
    name: 'Tableau de bord',
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
  },
  {
    id: 'bookings',
    name: 'Mes réservations',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
  },
  {
    id: 'personal',
    name: 'Informations personnelles',
    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    id: 'settings',
    name: 'Paramètres',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  }
])

// Bookings
const bookings = ref<any[]>([])
const recentBookings = computed(() => bookings.value.slice(0, 3).map(mapBookingToCard))

// Computed properties
const userInitials = computed(() => {
  return (userData.value.fullName || '')
    .split(' ')
    .filter(Boolean)
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
})

const memberSince = computed(() => {
  const date = new Date(userData.value.joinDate)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
})

const loyaltyProgressPercent = computed(() => {
  return Math.min((loyaltyPoints.value / nextLevelPoints.value) * 100, 100)
})

const currentBenefits = computed(() => {
  const benefits: Record<string, string[]> = {
    Bronze: ['Réservation en ligne', 'Support client'],
    Silver: ['Réservation en ligne', 'Support client', '5% de réduction', 'Annulation gratuite'],
    Gold: ['Réservation en ligne', 'Support client', '10% de réduction', 'Annulation gratuite', 'Sélection prioritaire des places'],
    Diamond: ['Réservation en ligne', 'Support client', '15% de réduction', 'Annulation gratuite', 'Sélection prioritaire des places', 'Surclassement gratuit']
  }
  return benefits[userData.value.level] || benefits.Bronze
})

const filteredBookings = computed(() => {
  let items = bookings.value.map(mapBookingToCard)

  if (bookingFilters.value.status) {
    items = items.filter(b => b.status === bookingFilters.value.status)
  }

  if (bookingFilters.value.destination) {
    items = items.filter(b => b.route.includes(bookingFilters.value.destination))
  }

  return items
})

// Helpers
function mapBookingToCard(b: any) {
  const from = b.schedule?.route?.departureCity?.name || ''
  const to = b.schedule?.route?.destinationCity?.name || ''
  const dep = b.schedule?.departureAt || b.schedule?.departure_at
  const price = Number(b.totalPrice || 0)
  const status = b.status === 'cancelled' ? 'cancelled' : (b.status === 'completed' ? 'completed' : (b.status === 'pending' ? 'pending' : 'upcoming'))
  const seats = Array.isArray(b.passengers) ? b.passengers.map((p: any) => p.seat).filter(Boolean) : []
  return {
    id: b.id,
    reference: b.reference,
    route: `${from} → ${to}`,
    date: dep,
    price,
    status,
    seats
  }
}

const getNextLevel = () => {
  const levels = ['Bronze', 'Silver', 'Gold', 'Diamond']
  const currentIndex = levels.indexOf(userData.value.level)
  return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : 'Diamond'
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    upcoming: 'À venir',
    completed: 'Terminé',
    cancelled: 'Annulé',
    pending: 'En attente'
  }
  return statusMap[status] || status
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Actions
async function loadUser(userId: number) {
  const u = await getUser(userId)
  userData.value = {
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone,
    birthDate: u.birthDate || '',
    gender: u.gender || '',
    city: u.city?.name || '',
    level: u.level || 'Bronze',
    joinDate: u.joinDate || new Date().toISOString().split('T')[0],
    loyaltyPoints: Number(u.loyaltyPoints || 0)
  }
  editableUserData.value = { ...userData.value }
  loyaltyPoints.value = userData.value.loyaltyPoints
  if (u.settings) {
    settings.value.emailConfirmation = !!u.settings.emailConfirmation
    settings.value.travelReminders = !!u.settings.travelReminders
    settings.value.promotions = !!u.settings.promotions
  }
}

async function loadBookings(userId: number) {
  const list = await getUserBookings(userId)
  bookings.value = Array.isArray(list) ? list : []

  // Stats
  stats.value.totalTrips = bookings.value.length
  stats.value.totalSpent = bookings.value.reduce((sum, b: any) => sum + Number(b.totalPrice || 0), 0)
  const counts: Record<string, number> = {}
  for (const b of bookings.value) {
    const dest = b.schedule?.route?.destinationCity?.name
    if (dest) counts[dest] = (counts[dest] || 0) + 1
  }
  const fav = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]
  stats.value.favoriteDest = fav ? fav[0] : ''
}

const updatePersonalInfo = async () => {
  try {
    const payload: any = {
      fullName: editableUserData.value.fullName,
      phone: editableUserData.value.phone,
      gender: editableUserData.value.gender || undefined,
      birthDate: editableUserData.value.birthDate || undefined
    }
    const u = await updateUser(userData.value.id, payload)
    userData.value.fullName = u.fullName
    userData.value.phone = u.phone
    userData.value.gender = u.gender || ''
    userData.value.birthDate = u.birthDate || ''
    editableUserData.value = { ...userData.value }
    alert('Informations mises à jour avec succès !')
  } catch (e) {
    alert('Erreur lors de la mise à jour du profil')
  }
}

const resetPersonalInfo = () => {
  editableUserData.value = { ...userData.value }
}

const updateEmergencyContact = () => {
  alert('Contact d\'urgence mis à jour avec succès !')
}

const clearFilters = () => {
  bookingFilters.value = {
    status: '',
    period: '',
    destination: ''
  }
}

const downloadBooking = async (booking: any) => {
  const [from, to] = String(booking.route || '').split(' → ').map((s: string) => s.trim())
  await downloadBookingPdfAsync({
    reference: booking.reference || booking.id,
    from: from || '',
    to: to || '',
    date: booking.date,
    seats: booking.seats || [],
    totalPrice: booking.price,
    busType: undefined,
    passengers: []
  })
}

const isCancellingRef = ref<string | null>(null)

const cancelBooking = async (booking: any) => {
  if (!confirm('Confirmer l\'annulation de cette réservation ?')) return
  const reason = prompt('Motif d\'annulation (optionnel) :') || undefined
  try {
    isCancellingRef.value = booking.reference
    await apiCancelBooking(booking.id, { reason })
    booking.status = 'cancelled'
    alert('Réservation annulée')
  } catch (e) {
    alert('Erreur lors de l\'annulation. Veuillez réessayer.')
  } finally {
    isCancellingRef.value = null
  }
}

onMounted(async () => {
  const current = authService.getCurrentUser()
  const id = current?.id ? Number(current.id) : 1
  await loadUser(id)
  await loadBookings(id)
})
</script>

<style scoped>
.tab-transition {
  transition: all 0.3s ease;
}
</style>
