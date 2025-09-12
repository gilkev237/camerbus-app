<template>
  <div class="min-h-screen bg-neutral-100">
    <!-- Admin Header -->
    <header class="bg-white shadow-sm border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-neutral-800">CamerBus Admin</h1>
              <p class="text-sm text-neutral-600">Panneau d'administration</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button class="relative p-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <!-- Admin User -->
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <span class="text-sm font-medium text-primary-700">AD</span>
              </div>
              <div class="hidden md:block">
                <div class="text-sm font-medium text-neutral-800">Admin</div>
                <div class="text-xs text-neutral-600">Administrateur</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Navigation Tabs -->
      <div class="mb-8">
        <div class="border-b border-neutral-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in adminTabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
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
                <span v-if="tab.badge" class="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">{{ tab.badge }}</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <!-- Dashboard Tab -->
      <div v-if="activeTab === 'dashboard'" class="space-y-8">
        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ metrics.todayBookings }}</div>
                <div class="text-sm text-neutral-600">Réservations aujourd'hui</div>
                <div class="text-xs text-green-600 mt-1">+{{ metrics.bookingGrowth }}% vs hier</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ metrics.todayRevenue.toLocaleString() }}</div>
                <div class="text-sm text-neutral-600">Revenus FCFA aujourd'hui</div>
                <div class="text-xs text-green-600 mt-1">+{{ metrics.revenueGrowth }}% vs hier</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ metrics.activeBuses }}</div>
                <div class="text-sm text-neutral-600">Bus actifs</div>
                <div class="text-xs text-neutral-500 mt-1">{{ metrics.totalBuses }} total</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-neutral-800">{{ metrics.activeUsers }}</div>
                <div class="text-sm text-neutral-600">Utilisateurs actifs</div>
                <div class="text-xs text-green-600 mt-1">+{{ metrics.userGrowth }}% ce mois</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts and Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Revenue Chart -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Revenus des 7 derniers jours</h3>
            <div class="h-64 bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg flex items-center justify-center">
              <div class="text-center text-neutral-600">
                <svg class="w-16 h-16 mx-auto mb-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Graphique des revenus</p>
                <p class="text-sm">Simulation de données</p>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Activité récente</h3>
            <div class="space-y-4">
              <div
                v-for="activity in recentActivities"
                :key="activity.id"
                class="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg"
              >
                <div
                  :class="[
                    'w-2 h-2 rounded-full flex-shrink-0',
                    activity.type === 'booking' ? 'bg-green-500' :
                    activity.type === 'cancellation' ? 'bg-red-500' :
                    activity.type === 'payment' ? 'bg-blue-500' : 'bg-yellow-500'
                  ]"
                ></div>
                <div class="flex-1 min-w-0">
                  <div class="text-sm font-medium text-neutral-800">{{ activity.title }}</div>
                  <div class="text-xs text-neutral-600">{{ activity.description }}</div>
                </div>
                <div class="text-xs text-neutral-500">{{ formatTime(activity.time) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <h3 class="text-lg font-semibold text-neutral-800 mb-6">Actions rapides</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.id"
              @click="executeQuickAction(action.id)"
              class="flex flex-col items-center p-4 bg-neutral-50 hover:bg-primary-50 rounded-lg transition-colors duration-200 group"
            >
              <div class="w-12 h-12 bg-primary-100 group-hover:bg-primary-200 rounded-lg flex items-center justify-center mb-3 transition-colors">
                <svg class="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="action.icon" />
                </svg>
              </div>
              <span class="text-sm font-medium text-neutral-700 text-center">{{ action.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Routes Management Tab -->
      <div v-if="activeTab === 'routes'" class="space-y-6">
        <!-- Routes Header -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 class="text-2xl font-bold text-neutral-800">Gestion des trajets</h2>
          <button
            @click="showAddRouteModal = true"
            class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Nouveau trajet
          </button>
        </div>

        <!-- Routes Filters -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Rechercher</label>
              <input
                v-model="routeFilters.search"
                type="text"
                placeholder="Nom du trajet..."
                class="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Statut</label>
              <select v-model="routeFilters.status" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Ville de départ</label>
              <select v-model="routeFilters.departure" class="w-full px-3 py-2 border border-neutral-300 rounded-lg">
                <option value="">Toutes les villes</option>
                <option value="Yaoundé">Yaoundé</option>
                <option value="Douala">Douala</option>
                <option value="Bamenda">Bamenda</option>
              </select>
            </div>
            <div class="flex items-end">
              <button
                @click="clearRouteFilters"
                class="w-full py-2 px-4 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-lg transition-colors duration-200"
              >
                Effacer
              </button>
            </div>
          </div>
        </div>

        <!-- Routes Table -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Trajet</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Horaires</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Prix</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Bus assigné</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="route in filteredRoutes" :key="route.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-neutral-800">{{ route.departure }} → {{ route.destination }}</div>
                    <div class="text-sm text-neutral-600">{{ route.distance }} km</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-800">{{ route.departureTime }} - {{ route.arrivalTime }}</div>
                    <div class="text-sm text-neutral-600">{{ route.frequency }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-800">{{ route.price.toLocaleString() }} FCFA</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-800">{{ route.busNumber }}</div>
                    <div class="text-sm text-neutral-600">{{ route.busType }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                        route.status === 'active' ? 'bg-green-100 text-green-800' :
                        route.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      ]"
                    >
                      {{ getStatusText(route.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="text-primary-600 hover:text-primary-700 transition-colors">Modifier</button>
                    <button class="text-blue-600 hover:text-blue-700 transition-colors">Voir</button>
                    <button class="text-red-600 hover:text-red-700 transition-colors">Supprimer</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Bookings Management Tab -->
      <div v-if="activeTab === 'bookings'" class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 class="text-2xl font-bold text-neutral-800">Suivi des réservations</h2>
          <div class="mt-4 md:mt-0 flex items-center space-x-4">
            <button class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exporter
            </button>
            <button class="inline-flex items-center px-4 py-2 bg-neutral-600 hover:bg-neutral-700 text-white font-medium rounded-lg transition-colors duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Actualiser
            </button>
          </div>
        </div>

        <!-- Booking Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-blue-600">{{ bookingStats.pending }}</div>
            <div class="text-sm text-neutral-600 mt-1">En attente</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-green-600">{{ bookingStats.confirmed }}</div>
            <div class="text-sm text-neutral-600 mt-1">Confirmées</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-yellow-600">{{ bookingStats.inProgress }}</div>
            <div class="text-sm text-neutral-600 mt-1">En cours</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-red-600">{{ bookingStats.cancelled }}</div>
            <div class="text-sm text-neutral-600 mt-1">Annulées</div>
          </div>
        </div>

        <!-- Recent Bookings -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800">Réservations récentes</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-neutral-200">
              <thead class="bg-neutral-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Référence</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Client</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Trajet</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Montant</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Statut</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-neutral-200">
                <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-neutral-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-800">{{ booking.reference }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-800">{{ booking.clientName }}</div>
                    <div class="text-sm text-neutral-600">{{ booking.clientPhone }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-800">{{ booking.route }}</div>
                    <div class="text-sm text-neutral-600">Places: {{ booking.seats.join(', ') }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-neutral-800">{{ formatDate(booking.date) }}</div>
                    <div class="text-sm text-neutral-600">{{ booking.time }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-neutral-800">{{ booking.amount.toLocaleString() }} FCFA</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      ]"
                    >
                      {{ getBookingStatusText(booking.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button class="text-primary-600 hover:text-primary-700 transition-colors">Voir</button>
                    <button class="text-blue-600 hover:text-blue-700 transition-colors">Modifier</button>
                    <button class="text-red-600 hover:text-red-700 transition-colors">Annuler</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Fleet Management Tab -->
      <div v-if="activeTab === 'fleet'" class="space-y-6">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 class="text-2xl font-bold text-neutral-800">Gestion de la flotte</h2>
          <button class="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Ajouter un bus
          </button>
        </div>

        <!-- Fleet Overview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-green-600">{{ fleetStats.operational }}</div>
            <div class="text-sm text-neutral-600 mt-1">Bus opérationnels</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-yellow-600">{{ fleetStats.maintenance }}</div>
            <div class="text-sm text-neutral-600 mt-1">En maintenance</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-red-600">{{ fleetStats.outOfService }}</div>
            <div class="text-sm text-neutral-600 mt-1">Hors service</div>
          </div>
        </div>

        <!-- Fleet List -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="bus in fleetList"
            :key="bus.id"
            class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-neutral-800">{{ bus.number }}</h3>
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                  bus.status === 'operational' ? 'bg-green-100 text-green-800' :
                  bus.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                ]"
              >
                {{ getBusStatusText(bus.status) }}
              </span>
            </div>

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-neutral-600">Type:</span>
                <span class="font-medium">{{ bus.type }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Capacité:</span>
                <span class="font-medium">{{ bus.capacity }} places</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Trajet actuel:</span>
                <span class="font-medium">{{ bus.currentRoute || 'Aucun' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-neutral-600">Dernière maintenance:</span>
                <span class="font-medium">{{ formatDate(bus.lastMaintenance) }}</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-neutral-200 flex space-x-2">
              <button class="flex-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors">
                Détails
              </button>
              <button class="flex-1 px-3 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-sm font-medium rounded-lg transition-colors">
                Maintenance
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Users & Support Tab -->
      <div v-if="activeTab === 'users'" class="space-y-6">
        <h2 class="text-2xl font-bold text-neutral-800">Gestion des utilisateurs</h2>

        <!-- User Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-blue-600">{{ userStats.total }}</div>
            <div class="text-sm text-neutral-600 mt-1">Total utilisateurs</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-green-600">{{ userStats.active }}</div>
            <div class="text-sm text-neutral-600 mt-1">Actifs ce mois</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-yellow-600">{{ userStats.newThisMonth }}</div>
            <div class="text-sm text-neutral-600 mt-1">Nouveaux ce mois</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-3xl font-bold text-purple-600">{{ userStats.vip }}</div>
            <div class="text-sm text-neutral-600 mt-1">Membres VIP</div>
          </div>
        </div>

        <!-- Support Tickets -->
        <div class="bg-white rounded-xl shadow-sm border border-neutral-200">
          <div class="px-6 py-4 border-b border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800">Tickets de support récents</h3>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div
                v-for="ticket in supportTickets"
                :key="ticket.id"
                class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
              >
                <div class="flex items-center space-x-4">
                  <div
                    :class="[
                      'w-3 h-3 rounded-full',
                      ticket.priority === 'high' ? 'bg-red-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    ]"
                  ></div>
                  <div>
                    <div class="font-medium text-neutral-800">{{ ticket.subject }}</div>
                    <div class="text-sm text-neutral-600">{{ ticket.user }} • {{ formatTime(ticket.created) }}</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-medium rounded-full',
                      ticket.status === 'open' ? 'bg-red-100 text-red-800' :
                      ticket.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    ]"
                  >
                    {{ getTicketStatusText(ticket.status) }}
                  </span>
                  <button class="text-primary-600 hover:text-primary-700 transition-colors font-medium text-sm">
                    Répondre
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-if="activeTab === 'analytics'" class="space-y-6">
        <h2 class="text-2xl font-bold text-neutral-800">Rapports et analytics</h2>

        <!-- Analytics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-2xl font-bold text-blue-600">{{ analytics.totalRevenue.toLocaleString() }}</div>
            <div class="text-sm text-neutral-600 mt-1">Revenus totaux (FCFA)</div>
            <div class="text-xs text-green-600 mt-1">+15% ce mois</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-2xl font-bold text-green-600">{{ analytics.totalTrips }}</div>
            <div class="text-sm text-neutral-600 mt-1">Voyages totaux</div>
            <div class="text-xs text-green-600 mt-1">+8% ce mois</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-2xl font-bold text-yellow-600">{{ analytics.avgOccupancy }}%</div>
            <div class="text-sm text-neutral-600 mt-1">Taux d'occupation moyen</div>
            <div class="text-xs text-green-600 mt-1">+3% ce mois</div>
          </div>
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div class="text-2xl font-bold text-purple-600">{{ analytics.customerSatisfaction }}/5</div>
            <div class="text-sm text-neutral-600 mt-1">Satisfaction client</div>
            <div class="text-xs text-green-600 mt-1">+0.2 ce mois</div>
          </div>
        </div>

        <!-- Charts Placeholder -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Évolution des réservations</h3>
            <div class="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p class="text-neutral-600">Graphique des réservations</p>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 class="text-lg font-semibold text-neutral-800 mb-6">Trajets populaires</h3>
            <div class="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
              <p class="text-neutral-600">Top trajets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { listSchedules, listBuses, listBookings, listSupportTickets } from '@/services/api'
import type { Booking } from '@/services/bookingService'

// State
const activeTab = ref('dashboard')

// Admin tabs configuration
const adminTabs = ref([
  { id: 'dashboard', name: 'Tableau de bord', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z', badge: null },
  { id: 'routes', name: 'Trajets', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', badge: null },
  { id: 'bookings', name: 'Réservations', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', badge: null },
  { id: 'fleet', name: 'Flotte', icon: 'M13 10V3L4 14h7v7l9-11h-7z', badge: null },
  { id: 'users', name: 'Utilisateurs', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', badge: null },
  { id: 'analytics', name: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', badge: null }
])

// Data sources
const schedules = ref<any[]>([])
const buses = ref<any[]>([])
const bookings = ref<any[]>([])
const tickets = ref<any[]>([])

// Dashboard metrics
const metrics = ref({
  todayBookings: 0,
  bookingGrowth: 0,
  todayRevenue: 0,
  revenueGrowth: 0,
  activeBuses: 0,
  totalBuses: 0,
  activeUsers: 0,
  userGrowth: 0
})

// Quick actions
const quickActions = ref([
  { id: 'add-route', name: 'Nouveau trajet', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
  { id: 'view-bookings', name: 'Réservations', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { id: 'fleet-status', name: 'État flotte', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'reports', name: 'Rapports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'maintenance', name: 'Maintenance', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { id: 'support', name: 'Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.944l7.071 7.071-7.071 7.071L4.929 9.915 12 2.944z' }
])

// Recent activities (kept as UI demo)
const recentActivities = ref([
  { id: 1, type: 'booking', title: 'Nouvelle réservation', description: 'Activité récente', time: new Date(Date.now() - 5 * 60000) }
])

// Routes management (from schedules)
const routeFilters = ref({ search: '', status: '', departure: '' })
const routes = computed(() => schedules.value.map((s: any) => ({
  id: s.id,
  departure: s.route?.departureCity?.name || '',
  destination: s.route?.destinationCity?.name || '',
  distance: s.route?.distanceKm || s.route?.distance_km || 0,
  departureTime: new Date(s.departureAt || s.departure_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  arrivalTime: new Date(s.arrivalAt || s.arrival_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  frequency: '',
  price: Number(s.price || s.route?.basePrice || 0),
  busNumber: s.bus?.number || '',
  busType: s.bus?.type || '',
  status: s.status || 'active'
})))

// Bookings management
const bookingStats = computed(() => {
  const counts = { pending: 0, confirmed: 0, inProgress: 0, cancelled: 0 }
  for (const b of bookings.value) {
    if (b.status === 'pending') counts.pending++
    else if (b.status === 'confirmed') counts.confirmed++
    else if (b.status === 'cancelled') counts.cancelled++
    else counts.inProgress++
  }
  return counts
})

const recentBookings = computed(() => bookings.value.slice(0, 20).map((b: any) => ({
  id: b.id,
  reference: b.reference,
  clientName: b.user?.fullName || '',
  clientPhone: b.user?.phone || '',
  route: `${b.schedule?.route?.departureCity?.name || ''} → ${b.schedule?.route?.destinationCity?.name || ''}`,
  date: (b.schedule?.departureAt || b.schedule?.departure_at || '').slice(0, 10),
  time: new Date(b.schedule?.departureAt || b.schedule?.departure_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  seats: Array.isArray(b.passengers) ? b.passengers.map((p: any) => p.seat).filter(Boolean) : [],
  amount: Number(b.totalPrice || 0),
  status: b.status || 'pending'
})))

// Fleet management
const fleetStats = computed(() => {
  const stats = { operational: 0, maintenance: 0, outOfService: 0 }
  for (const bus of buses.value) {
    if (bus.status === 'operational') stats.operational++
    else if (bus.status === 'maintenance') stats.maintenance++
    else stats.outOfService++
  }
  return stats
})

const fleetList = computed(() => buses.value.map((bus: any) => ({
  id: bus.id,
  number: bus.number,
  type: bus.type,
  capacity: bus.capacity,
  status: bus.status,
  currentRoute: null,
  lastMaintenance: bus.lastMaintenance || bus.last_maintenance || ''
})))

// Users management (derived from bookings)
const userStats = computed(() => {
  const uniqueAll = new Set<number>()
  const unique30 = new Set<number>()
  const vip = new Set<number>()
  const now = new Date()
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstSeen = new Map<number, Date>()

  for (const b of bookings.value) {
    const uid = b.userId || b.user?.id
    if (!uid) continue
    uniqueAll.add(uid)
    const dep = new Date(b.schedule?.departureAt || b.schedule?.departure_at || b.createdAt || b.created_at)
    if ((now.getTime() - dep.getTime()) <= 30 * 24 * 3600 * 1000) unique30.add(uid)
    if (b.user?.level && ['Gold', 'Diamond'].includes(b.user.level)) vip.add(uid)
    const prev = firstSeen.get(uid)
    if (!prev || dep < prev) firstSeen.set(uid, dep)
  }

  let newThisMonth = 0
  firstSeen.forEach((d) => { if (d >= startMonth) newThisMonth++ })

  return {
    total: uniqueAll.size,
    active: unique30.size,
    newThisMonth,
    vip: vip.size
  }
})

const supportTickets = ref<any[]>([])

// Analytics (basic derivation)
const analytics = ref({ totalRevenue: 0, totalTrips: 0, avgOccupancy: 0, customerSatisfaction: 4.6 })

// Computed
const filteredRoutes = computed(() => {
  let filtered = [...routes.value]
  if (routeFilters.value.search) {
    filtered = filtered.filter(route =>
      route.departure.toLowerCase().includes(routeFilters.value.search.toLowerCase()) ||
      route.destination.toLowerCase().includes(routeFilters.value.search.toLowerCase())
    )
  }
  if (routeFilters.value.status) {
    filtered = filtered.filter(route => route.status === routeFilters.value.status)
  }
  if (routeFilters.value.departure) {
    filtered = filtered.filter(route => route.departure === routeFilters.value.departure)
  }
  return filtered
})

// Methods
const formatTime = (date: Date) => {
  return new Intl.RelativeTimeFormat('fr').format(
    Math.ceil((date.getTime() - Date.now()) / (1000 * 60)),
    'minute'
  )
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = { active: 'Actif', inactive: 'Inactif', maintenance: 'Maintenance' }
  return statusMap[status] || status
}

const getBookingStatusText = (status: string) => {
  const statusMap: Record<string, string> = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée', completed: 'Terminée' }
  return statusMap[status] || status
}

const getBusStatusText = (status: string) => {
  const statusMap: Record<string, string> = { operational: 'Opérationnel', maintenance: 'Maintenance', 'out-of-service': 'Hors service' }
  return statusMap[status] || status
}

const getTicketStatusText = (status: string) => {
  const statusMap: Record<string, string> = { open: 'Ouvert', 'in-progress': 'En cours', closed: 'Fermé' }
  return statusMap[status] || status
}

const executeQuickAction = (actionId: string) => {
  switch (actionId) {
    case 'add-route': activeTab.value = 'routes'; break
    case 'view-bookings': activeTab.value = 'bookings'; break
    case 'fleet-status': activeTab.value = 'fleet'; break
    case 'reports': activeTab.value = 'analytics'; break
    default: break
  }
}

const clearRouteFilters = () => {
  routeFilters.value = { search: '', status: '', departure: '' }
}

async function loadAll() {
  const [sch, busList, bks, tks] = await Promise.all([
    listSchedules(),
    listBuses(),
    listBookings(),
    listSupportTickets()
  ])
  schedules.value = Array.isArray(sch) ? sch : []
  buses.value = Array.isArray(busList) ? busList : []
  bookings.value = Array.isArray(bks) ? bks : []
  supportTickets.value = Array.isArray(tks) ? tks.map((t: any) => ({
    id: t.id,
    subject: t.subject,
    user: t.userId ? `#${t.userId}` : 'Anonyme',
    priority: t.priority || 'medium',
    status: t.status || 'open',
    created: new Date(t.createdAt || t.created_at)
  })) : []

  // Metrics
  const todayStr = new Date().toISOString().slice(0, 10)
  metrics.value.totalBuses = buses.value.length
  metrics.value.activeBuses = buses.value.filter((b: any) => b.status === 'operational').length
  const todayBookings = bookings.value.filter((b: any) => {
    const d = String(b.createdAt || b.created_at || b.schedule?.departureAt || b.schedule?.departure_at)
    return d.startsWith(todayStr)
  })
  metrics.value.todayBookings = todayBookings.length
  const todayRevenue = todayBookings.reduce((sum: number, b: any) => {
    const completed = (b.paymentStatus || '').toLowerCase() === 'completed' || (b.payment?.status || '').toLowerCase() === 'completed'
    return sum + (completed ? Number(b.payment?.amount || b.totalPrice || 0) : 0)
  }, 0)
  metrics.value.todayRevenue = todayRevenue

  // Users
  const now = Date.now()
  const last7 = bookings.value.filter((b: any) => new Date(b.createdAt || b.created_at).getTime() >= now - 7*24*3600*1000).length
  const prev7 = bookings.value.filter((b: any) => {
    const t = new Date(b.createdAt || b.created_at).getTime()
    return t < now - 7*24*3600*1000 && t >= now - 14*24*3600*1000
  }).length
  metrics.value.bookingGrowth = prev7 ? Math.round(((last7 - prev7) / prev7) * 100) : (last7 > 0 ? 100 : 0)

  const active30Users = new Set<number>()
  for (const b of bookings.value) {
    const t = new Date(b.createdAt || b.created_at).getTime()
    if (now - t <= 30*24*3600*1000) active30Users.add(b.userId || b.user?.id)
  }
  metrics.value.activeUsers = active30Users.size
}

onMounted(() => { loadAll() })
</script>

<style scoped>
.admin-transition {
  transition: all 0.3s ease;
}
</style>
