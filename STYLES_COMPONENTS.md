# 🎨 Styles CSS pour Chaque Composant/Vue CamerBus

## 📱 App.vue - Composant Principal
```vue
<style scoped>
/* Pas de styles personnalisés nécessaires - utilise TailwindCSS */
</style>
```

## 🧭 AppHeader.vue - Navigation
```vue
<style scoped>
/* Effet hover sur le logo */
.logo-hover {
  transition: transform 0.2s ease-in-out;
}

.logo-hover:hover {
  transform: scale(1.05);
}

/* Animation du menu mobile */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

/* Indicateur de page active */
.router-link-active {
  color: #16a34a !important;
  font-weight: 600;
}

/* Ombre douce personnalisée */
.shadow-soft {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
}
</style>
```

## 🦶 AppFooter.vue - Pied de page
```vue
<style scoped>
/* Liens du footer avec transition */
.footer-link {
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff !important;
  text-decoration: underline;
}

/* Logo du footer */
.footer-logo {
  filter: brightness(1.1);
  transition: filter 0.3s ease;
}

.footer-logo:hover {
  filter: brightness(1.3);
}
</style>
```

## 🏠 Home.vue - Page d'accueil
```vue
<style scoped>
/* Gradient Cameroun personnalisé */
.bg-cameroon-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #15803d 50%, #fbbf24 100%);
}

/* Pattern de fond héro */
.bg-hero-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

/* Animations personnalisées */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

/* Effet hover sur les cartes de trajets populaires */
.route-card {
  transition: all 0.3s ease;
}

.route-card:hover {
  transform: translateY(-5px);
}

/* Bouton de recherche avec effet scale */
.search-button {
  transition: all 0.2s ease;
}

.search-button:hover {
  transform: scale(1.02);
}

/* Cartes de fonctionnalités */
.feature-icon {
  transition: all 0.3s ease;
}

.feature-icon:hover {
  transform: rotate(5deg) scale(1.1);
}

/* Cartes de paiement */
.payment-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.payment-card:hover {
  border-color: #22c55e;
  transform: translateY(-2px);
}

/* Ombres personnalisées */
.shadow-soft {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

.shadow-medium {
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-large {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Responsive pour le formulaire de recherche */
@media (max-width: 768px) {
  .search-form {
    padding: 1rem;
  }
  
  .search-form .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
```

## 🔍 Search.vue - Page de recherche
```vue
<style scoped>
/* Animation d'entrée pour les résultats */
.result-item {
  animation: slideInUp 0.4s ease-out;
  animation-fill-mode: both;
}

.result-item:nth-child(1) { animation-delay: 0.1s; }
.result-item:nth-child(2) { animation-delay: 0.2s; }
.result-item:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Indicateur de type de bus */
.bus-type-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.bus-type-standard { background-color: #22c55e; }
.bus-type-vip { background-color: #f59e0b; }
.bus-type-executive { background-color: #8b5cf6; }

/* Ligne de connexion entre villes */
.route-line {
  position: relative;
  height: 2px;
  background: linear-gradient(to right, #22c55e, #16a34a);
}

.route-line::after {
  content: '';
  position: absolute;
  right: -6px;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 6px solid #16a34a;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

/* Bouton de réservation */
.book-button {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.book-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
}

.book-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Filtres panel */
.filters-panel {
  background: linear-gradient(145deg, #f8fafc, #f1f5f9);
  border: 1px solid #e2e8f0;
}

/* Indicateur de disponibilité limitée */
.limited-availability {
  color: #dc2626;
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>
```

## 📝 Booking.vue - Page de réservation
```vue
<style scoped>
/* Grille de sélection des places */
.seat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  max-width: 200px;
  margin: 0 auto;
}

.seat {
  width: 32px;
  height: 32px;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;
}

.seat:hover {
  border-color: #22c55e;
  transform: scale(1.05);
}

.seat.selected {
  background: #22c55e;
  border-color: #16a34a;
  color: white;
}

.seat.occupied {
  background: #ef4444;
  border-color: #dc2626;
  color: white;
  cursor: not-allowed;
}

.seat.occupied:hover {
  transform: none;
}

/* Formulaire passager */
.passenger-form {
  background: linear-gradient(145deg, #f8fafc, #f1f5f9);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.passenger-form:nth-child(even) {
  background: linear-gradient(145deg, #f0fdf4, #ecfdf5);
}

/* Étapes de réservation */
.booking-steps {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.step {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-radius: 20px;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
}

.step.active {
  background: #22c55e;
  color: white;
}

.step.completed {
  background: #16a34a;
  color: white;
}

/* Récapitulatif de prix */
.price-summary {
  background: linear-gradient(145deg, #fffbeb, #fef3c7);
  border: 2px solid #fbbf24;
  border-radius: 12px;
  padding: 1.5rem;
}

/* Animation de validation */
.validation-error {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>
```

## 🔐 Login.vue - Page de connexion
```vue
<style scoped>
/* Conteneur de connexion */
.login-container {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  min-height: 100vh;
}

/* Carte de connexion */
.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Logo avec animation */
.login-logo {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Champs de formulaire */
.form-input {
  transition: all 0.3s ease;
  border: 2px solid #e5e7eb;
}

.form-input:focus {
  border-color: #22c55e;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
  transform: translateY(-1px);
}

/* Bouton de connexion */
.login-button {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

.login-button:active {
  transform: translateY(0);
}

/* Liens */
.form-link {
  color: #22c55e;
  text-decoration: none;
  transition: color 0.3s ease;
}

.form-link:hover {
  color: #16a34a;
  text-decoration: underline;
}

/* Checkbox personnalisé */
.custom-checkbox {
  accent-color: #22c55e;
}
</style>
```

## ✍️ Register.vue - Page d'inscription
```vue
<style scoped>
/* Conteneur d'inscription */
.register-container {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #fffbeb 100%);
  min-height: 100vh;
}

/* Carte d'inscription */
.register-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animation du logo */
.register-logo {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(34, 197, 94, 0.5);
  }
}

/* Grille de formulaire */
.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* Validation en temps réel */
.input-valid {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

.input-invalid {
  border-color: #ef4444;
  background-color: #fef2f2;
}

/* Indicateur de force du mot de passe */
.password-strength {
  height: 4px;
  border-radius: 2px;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
}

.password-weak { background: #ef4444; width: 33%; }
.password-medium { background: #f59e0b; width: 66%; }
.password-strong { background: #22c55e; width: 100%; }

/* Bouton d'inscription */
.register-button {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  transition: all 0.3s ease;
  position: relative;
}

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(34, 197, 94, 0.3);
}

/* Termes et conditions */
.terms-checkbox {
  accent-color: #22c55e;
}

.terms-text {
  font-size: 0.875rem;
  line-height: 1.4;
}
</style>
```

## 📄 Placeholder.vue - Pages en développement
```vue
<style scoped>
/* Conteneur principal */
.placeholder-container {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  min-height: 100vh;
}

/* Icône principale */
.placeholder-icon {
  animation: float-rotate 4s ease-in-out infinite;
}

@keyframes float-rotate {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
  }
  25% { 
    transform: translateY(-10px) rotate(5deg);
  }
  50% { 
    transform: translateY(-5px) rotate(0deg);
  }
  75% { 
    transform: translateY(-10px) rotate(-5deg);
  }
}

/* Carte de fonctionnalités */
.features-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.features-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

/* Liste de fonctionnalités */
.feature-item {
  transition: all 0.3s ease;
}

.feature-item:hover {
  background-color: #f0fdf4;
  transform: translateX(5px);
}

/* Icônes de check */
.check-icon {
  color: #22c55e;
  transition: all 0.3s ease;
}

.feature-item:hover .check-icon {
  transform: scale(1.2);
}

/* Boutons d'action */
.action-button {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(34, 197, 94, 0.25);
}

/* Texte de progression */
.progress-text {
  color: #6b7280;
  font-style: italic;
}

/* Animation de chargement */
.loading-dots::after {
  content: '';
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
}
</style>
```

## 🎨 Classes Utilitaires Globales (main.css)
```css
/* Classes personnalisées à ajouter dans src/assets/main.css */

/* Boutons */
.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-lg transition-all duration-200;
}

/* Cartes */
.card {
  @apply bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300;
}

/* Champs de saisie */
.input-field {
  @apply w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors;
}

/* Ombres personnalisées */
.shadow-soft {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

.shadow-medium {
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-large {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Animations globales */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    transform: translateY(20px); 
    opacity: 0; 
  }
  to { 
    transform: translateY(0); 
    opacity: 1; 
  }
}
```

## 📱 Responsive Breakpoints
```css
/* Breakpoints personnalisés */
@media (max-width: 640px) {
  .mobile-hidden { display: none; }
  .mobile-full { width: 100%; }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .tablet-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1025px) {
  .desktop-grid { grid-template-columns: repeat(4, 1fr); }
}
```

Ces styles complètent parfaitement les classes TailwindCSS et donnent le look professionnel et moderne au système CamerBus !
