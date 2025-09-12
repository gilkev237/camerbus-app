<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center">
    <div class="max-w-md w-full mx-auto text-center px-6">
      <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      
      <h1 class="text-2xl font-display font-bold text-neutral-800 mb-4">
        Page en développement
      </h1>
      
      <p class="text-neutral-600 mb-8">
        Cette section sera bientôt disponible. Notre équipe travaille activement sur cette fonctionnalité pour vous offrir la meilleure expérience possible.
      </p>
      
      <div class="space-y-4">
        <router-link 
          to="/" 
          class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0h3m0 0h3m0 0v-1a1 1 0 011-1V9a1 1 0 00-1-1H9a1 1 0 00-1 1v10z" />
          </svg>
          Retour à l'accueil
        </router-link>
        
        <div class="text-sm text-neutral-500">
          ou <router-link to="/search" class="text-primary-600 hover:text-primary-700 font-medium">rechercher un trajet</router-link>
        </div>
      </div>
      
      <!-- Features coming soon -->
      <div class="mt-12 p-6 bg-white rounded-xl shadow-soft">
        <h3 class="text-lg font-semibold text-neutral-800 mb-4">Fonctionnalités à venir</h3>
        <ul class="space-y-2 text-left text-neutral-600">
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Système de réservation complet</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Paiement mobile (MTN, Orange Money)</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Tickets électroniques PDF</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Gestion des annulations</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Support client 24/7</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
