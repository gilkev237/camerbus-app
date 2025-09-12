# 🎨 Assets Visuels du Projet CamerBus

## 📋 Inventaire des Ressources Visuelles

### 🖼️ Images et Logos Actuels

#### 1. **Logo Vue.js (à remplacer)**
- **Fichier**: `src/assets/logo.svg`
- **Type**: SVG vectoriel
- **Usage**: Logo par défaut Vue.js (doit être remplacé par logo CamerBus)
- **Couleurs**: Vert #41b883, Gris #34495e

#### 2. **Favicon**
- **Fichier**: `public/favicon.ico`
- **Type**: ICO
- **Usage**: Icône du navigateur
- **Note**: Favicon par défaut Vite

### 🎨 Design System Intégré (CSS)

#### Couleurs de Marque CamerBus
```css
/* Palette Cameroun */
Vert principal: #22c55e
Vert foncé: #15803d  
Rouge: #ef4444
Or/Jaune: #f59e0b
Gradient: linear-gradient(135deg, #22c55e 0%, #15803d 50%, #fbbf24 100%)
```

#### Icônes SVG Inline Utilisées

**Navigation et Actions:**
- 🚌 **Icône Bus** (logo CamerBus)
- 🔍 **Recherche** (loupe)
- 📍 **Localisation** (pin de carte)
- 📅 **Calendrier** (date)
- 👤 **Utilisateur** (profil)
- 🔒 **Sécurité** (cadenas)
- ⭐ **Étoiles** (notation)
- ✅ **Validation** (check mark)
- ❌ **Fermeture** (croix)
- 🏠 **Accueil** (maison)
- 📞 **Téléphone**
- ✉️ **Email**
- 🛡️ **Sécurité** (bouclier)
- 💰 **Prix** (dollar)
- ⏰ **Temps** (horloge)
- 🎯 **Support** (target)

### 📱 Recommandations pour Assets Personnalisés

#### 1. **Logo CamerBus Principal**
```
Dimensions: 200x200px minimum
Format: SVG (vectoriel)
Couleurs: Gradient camerounais
Usage: Header, footer, login
```

#### 2. **Favicon Personnalisé**
```
Dimensions: 32x32px, 16x16px
Format: ICO + PNG
Couleurs: Vert #22c55e sur fond blanc
```

#### 3. **Images de Fond Suggérées**
```
Hero Section: Bus moderne au Cameroun (1920x1080px)
Trajets populaires: Paysages camerounais (800x400px)
Page à propos: Équipe/bureaux (1200x600px)
```

#### 4. **Icônes de Paiement**
```
MTN Mobile Money: Logo officiel MTN
Orange Money: Logo officiel Orange  
Visa/Mastercard: Logos officiels cartes
```

## 🔗 Sources d'Icônes Utilisées

Le projet utilise principalement **Heroicons** via SVG inline :
- Site: https://heroicons.com
- Licence: MIT (libre d'usage)
- Style: Outline (2px stroke-width)

## 📦 Assets à Créer/Télécharger

### Priorité Haute 🔴

1. **Logo CamerBus**
   - Format SVG vectoriel
   - Versions: full color, monochrome blanc, monochrome noir
   - Tailles: 32px, 64px, 128px, 256px

2. **Favicon CamerBus**
   - Formats: ICO, PNG, SVG
   - Tailles multiples pour tous appareils

3. **Images Hero**
   - Bus modernes camerounais
   - Résolution: minimum 1920x1080px
   - Format: WebP + fallback JPG

### Priorité Moyenne 🟡

4. **Photos de Trajets**
   - Villes camerounaises principales
   - Format: 800x400px
   - Optimisées pour web

5. **Icônes de Paiement**
   - MTN MoMo, Orange Money
   - Logos officiels haute résolution

### Priorité Basse 🟢

6. **Illustrations**
   - Confort du voyage
   - Sécurité
   - Support client

## 🛠️ Outils Recommandés

### Création/Édition
- **Figma**: Design UI/UX
- **Adobe Illustrator**: Logos vectoriels
- **Canva**: Templates rapides
- **SVGOMG**: Optimisation SVG

### Optimisation
- **TinyPNG**: Compression images
- **Squoosh**: Formats modernes (WebP, AVIF)
- **ImageOptim**: Optimisation batch

## 📋 Checklist Assets

### ✅ Implémenté
- [x] Système de couleurs Cameroun
- [x] Icônes SVG système (Heroicons)
- [x] Typography (Inter + Poppins)
- [x] Gradient de marque
- [x] Design responsive

### ❌ À Créer
- [ ] Logo CamerBus personnalisé
- [ ] Favicon personnalisé  
- [ ] Images hero/background
- [ ] Photos de trajets
- [ ] Icônes de paiement officielles
- [ ] Illustrations custom

## 💾 Téléchargement des Assets

**Assets actuels disponibles:**
1. `src/assets/logo.svg` - Logo Vue.js temporaire
2. `public/favicon.ico` - Favicon Vite par défaut

**Note**: Les icônes du projet sont générées en SVG inline via le code Vue.js - elles n'existent pas en tant que fichiers séparés mais sont intégrées directement dans les composants.

Pour créer votre collection d'assets, je recommande de télécharger les icônes depuis Heroicons.com et de créer les assets personnalisés selon les spécifications ci-dessus.
