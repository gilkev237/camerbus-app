# Algorithme et Architecture du Système CamerBus

## 📊 Vue d'ensemble du Système

CamerBus est une plateforme de réservation de billets de bus pour le Cameroun construite avec Vue.js 3, TypeScript et TailwindCSS.

## 🏗️ Architecture Technique

### Stack Technologique
- **Frontend**: Vue 3.5.17 + TypeScript + Composition API
- **Styling**: TailwindCSS 3.4.11 avec design system personnalisé
- **Routing**: Vue Router 4
- **Build Tool**: Vite 7
- **Package Manager**: npm

### Structure des Dossiers
```
src/
├── assets/                 # Ressources statiques
│   ├── base.css           # Styles de base
│   ├── main.css           # Styles principaux + TailwindCSS
│   └── logo.svg           # Logo Vue.js (à remplacer)
├── components/            # Composants réutilisables
│   ├── AppHeader.vue      # Navigation principale
│   └── AppFooter.vue      # Pied de page
├── router/                # Configuration des routes
│   └── index.ts           # Définition des routes
├── views/                 # Pages principales
│   ├── Home.vue           # Page d'accueil
│   ├── Search.vue         # Recherche et filtrage
│   ├── Booking.vue        # Réservation
│   ├── Login.vue          # Connexion
│   ├── Register.vue       # Inscription
│   ├── Profile.vue        # Profil utilisateur
│   └── Placeholder.vue    # Pages en développement
├── App.vue                # Composant racine
└── main.ts                # Point d'entrée
```

## 🔄 Algorithmes Principaux

### 1. Algorithme de Recherche de Trajets

```typescript
// Fonction de recherche avec filtres
function searchRoutes(searchParams, filters) {
  let routes = getAllRoutes()
  
  // Filtrage par destination
  if (searchParams.from && searchParams.to) {
    routes = routes.filter(route => 
      route.departure.toLowerCase() === searchParams.from.toLowerCase() &&
      route.destination.toLowerCase() === searchParams.to.toLowerCase()
    )
  }
  
  // Filtres avancés
  if (filters.timeSlot) {
    routes = filterByTimeSlot(routes, filters.timeSlot)
  }
  
  if (filters.maxPrice) {
    routes = routes.filter(route => route.price <= filters.maxPrice)
  }
  
  if (filters.busType) {
    routes = routes.filter(route => 
      route.busType.toLowerCase() === filters.busType.toLowerCase()
    )
  }
  
  // Tri des résultats
  return sortRoutes(routes, sortBy)
}
```

### 2. Algorithme de Sélection de Places

```typescript
// Gestion de la sélection de places
function manageSeatSelection(seatNumber, selectedSeats, maxPassengers) {
  const seatIndex = selectedSeats.indexOf(seatNumber)
  
  if (seatIndex > -1) {
    // Désélectionner la place
    selectedSeats.splice(seatIndex, 1)
  } else if (selectedSeats.length < maxPassengers) {
    // Sélectionner la place si limite non atteinte
    selectedSeats.push(seatNumber)
  } else {
    // Erreur : trop de places sélectionnées
    showError("Nombre maximum de places atteint")
  }
  
  return selectedSeats
}
```

### 3. Algorithme de Validation de Réservation

```typescript
// Validation avant paiement
function validateBooking(bookingData) {
  const validationRules = [
    () => bookingData.selectedSeats.length === bookingData.passengers,
    () => bookingData.passengerInfo.every(p => p.name && p.phone),
    () => bookingData.route && bookingData.date,
    () => bookingData.totalPrice > 0
  ]
  
  return validationRules.every(rule => rule())
}
```

## 🎨 Système de Design

### Palette de Couleurs (Cameroun)
```css
/* Couleurs principales */
primary: #22c55e (Vert Cameroun)
secondary: #ef4444 (Rouge Cameroun)  
gold: #f59e0b (Or/Jaune Cameroun)
neutral: #737373 (Gris)

/* Gradient principal */
background: linear-gradient(135deg, #22c55e 0%, #15803d 50%, #fbbf24 100%)
```

### Typographie
```css
font-family: 
  - Display: 'Poppins' (Titres)
  - Sans: 'Inter' (Texte)
```

## 🔄 Flux de Navigation

### 1. Flux Principal de Réservation
```
Accueil → Recherche → Sélection → Réservation → Paiement → Confirmation
```

### 2. Flux d'Authentification
```
Login/Register → Profile → Historique des réservations
```

### 3. Flux de Recherche
```
Critères de recherche → Filtrage → Tri → Sélection de trajet
```

## 📱 Responsive Design

### Breakpoints TailwindCSS
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Adaptation Mobile
- Navigation hamburger < 768px
- Grilles responsive (1-2-3-4 colonnes)
- Formulaires empilés sur mobile

## 🛠️ Fonctionnalités Implémentées

### ✅ Complètes
1. **Page d'accueil** avec recherche rapide
2. **Système de recherche** avec filtres avancés
3. **Catalogue de trajets** avec données réalistes
4. **Interface de réservation** avec sélection de places
5. **Authentification** (Login/Register)
6. **Navigation responsive** avec header/footer
7. **Design system** complet aux couleurs du Cameroun

### 🚧 À Développer
1. **Intégration paiement** (MTN MoMo, Orange Money)
2. **Backend API** pour données réelles
3. **Génération de tickets** PDF/QR Code
4. **Gestion d'annulation**
5. **Support client** chat/formulaire
6. **Panel admin** back-office
7. **Notifications** email/SMS

## 🔐 Sécurité

### Bonnes Pratiques Implémentées
- Validation côté client avec TypeScript
- Sanitisation des entrées utilisateur
- Routes protégées pour l'authentification
- HTTPS ready pour la production

### À Implémenter
- Authentification JWT
- Chiffrement des données sensibles
- Rate limiting pour les API
- Validation côté serveur

## 📊 Métriques et Performance

### Optimisations
- Code splitting avec Vue Router
- Lazy loading des composants
- Images optimisées avec formats modernes
- CSS-in-JS avec TailwindCSS pour la performance

### Métriques Cibles
- Lighthouse Score > 90
- First Contentful Paint < 1.5s
- Time to Interactive < 3s

## 🗃️ Gestion des Données

### Structure des Données de Trajet
```typescript
interface Route {
  id: number
  departure: string
  destination: string
  departureTime: string
  arrivalTime: string
  duration: string
  price: string
  numericPrice: number
  busType: 'Standard' | 'VIP' | 'Executive'
  rating: number
  availability: number
  company: string
}
```

### Villes du Cameroun Supportées
```typescript
const cities = [
  'Yaoundé', 'Douala', 'Bamenda', 'Bafoussam', 
  'Garoua', 'Maroua', 'Ngaoundéré', 'Bertoua', 
  'Ebolowa', 'Kribi', 'Limbe', 'Kumba',
  'Buea', 'Dschang', 'Foumban', 'Mbalmayo', 
  'Sangmélima', 'Abong-Mbang'
]
```

## 🚀 Déploiement

### Commandes de Build
```bash
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run type-check   # Vérification TypeScript
npm run lint         # Vérification du code
```

### Environnements
- **Développement**: Vite dev server
- **Staging**: Build optimisé avec preview
- **Production**: Build minifié pour CDN

Cette architecture modulaire permet une évolutivité facile et une maintenance optimale du système de réservation CamerBus.
