<template>
  <footer class="bg-neutral-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 bg-cameroon-gradient rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span class="text-xl font-display font-bold">CamerBus</span>
          </div>
          <p class="text-neutral-400 max-w-md">
            Votre plateforme de confiance pour réserver vos billets de bus à travers tout le Cameroun. 
            Voyage confortable, sécurisé et abordable.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens Rapides</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-neutral-400 hover:text-white transition-colors">Accueil</router-link></li>
            <li><router-link to="/search" class="text-neutral-400 hover:text-white transition-colors">Rechercher</router-link></li>
            <li><router-link to="/support" class="text-neutral-400 hover:text-white transition-colors">Support</router-link></li>
            <li><router-link to="/admin" class="text-neutral-400 hover:text-white transition-colors">Administration</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Contact</h3>
          <ul class="space-y-2 text-neutral-400">
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+237 xxx xxx xxx</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>contact@camerbus.cm</span>
            </li>
            <li class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Yaoundé, Cameroun</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-neutral-400 text-sm">
          © 2024 CamerBus. Tous droits réservés.
        </p>
        <div class="flex space-x-6 mt-4 md:mt-0">
          <a href="#" class="text-neutral-400 hover:text-white transition-colors">
            Conditions d'utilisation
          </a>
          <a href="#" class="text-neutral-400 hover:text-white transition-colors">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
