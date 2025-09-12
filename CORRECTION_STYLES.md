# 🛠️ Correction des Styles TailwindCSS - CamerBus

## ❌ Problème Identifié

Les styles TailwindCSS ne s'appliquent pas car les **directives Tailwind** ne sont pas importées dans le fichier CSS principal.

## ✅ Solution

### 1. **Vérifier les Dépendances**

Assurez-vous que TailwindCSS est installé :

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2. **Corriger le fichier `src/assets/main.css`**

Remplacez le contenu par :

```css
@import './base.css';

/* Directives TailwindCSS OBLIGATOIRES */
@tailwind base;
@tailwind components; 
@tailwind utilities;

/* Styles personnalisés CamerBus */
@layer components {
  .btn-primary {
    @apply inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors;
  }
}

/* Gradient Cameroun */
.bg-cameroon-gradient {
  background: linear-gradient(135deg, #22c55e 0%, #15803d 50%, #fbbf24 100%);
}
```

### 3. **Vérifier `tailwind.config.js`**

Le fichier doit contenir :

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // ... autres couleurs
      },
      // ... autres extensions
    },
  },
  plugins: [],
}
```

### 4. **Vérifier `postcss.config.js`**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 5. **Vérifier l'import dans `main.ts`**

```typescript
import './assets/main.css'  // Doit être la première ligne

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
```

## 🚀 Étapes de Correction

### Option A : Projet Existant

Si vous avez déjà copié le code :

```bash
# 1. Installer les dépendances
npm install

# 2. Installer TailwindCSS si manquant
npm install -D tailwindcss postcss autoprefixer

# 3. Corriger le fichier main.css (voir ci-dessus)

# 4. Redémarrer le serveur
npm run dev
```

### Option B : Nouveau Projet

```bash
# 1. Créer un nouveau projet Vue
npm create vue@latest camerbus-project

# 2. Installer TailwindCSS
npm install -D tailwindcss postcss autoprefixer

# 3. Initialiser Tailwind
npx tailwindcss init -p

# 4. Copier tous les fichiers du projet
# 5. Corriger main.css avec les directives Tailwind
# 6. Lancer le projet
npm run dev
```

## 🔍 Diagnostic

### Vérifier que TailwindCSS fonctionne :

1. **Test simple** : Ajouter `class="text-red-500 text-4xl"` sur un élément
2. **Inspecter l'élément** : Les classes doivent apparaître avec les styles CSS
3. **Console navigateur** : Pas d'erreurs CSS

### Signes que ça marche :

- ✅ Les couleurs apparaissent (vert, rouge, or)
- ✅ Le gradient de fond fonctionne
- ✅ Les boutons ont leur style
- ✅ La navigation responsive fonctionne

### Signes de problème :

- ❌ Fond blanc partout
- ❌ Texte noir basique
- ❌ Pas de couleurs
- ❌ Layout cassé

## 📝 Checklist de Vérification

- [ ] `npm install` exécuté
- [ ] `tailwindcss` installé en dépendance dev
- [ ] `@tailwind` directives dans main.css
- [ ] `tailwind.config.js` avec bon content path
- [ ] `postcss.config.js` configuré
- [ ] `main.css` importé dans `main.ts`
- [ ] Serveur redémarré (`npm run dev`)
- [ ] Couleurs CamerBus visibles

## 🆘 Si le Problème Persiste

1. **Supprimer node_modules** : `rm -rf node_modules package-lock.json`
2. **Réinstaller** : `npm install`
3. **Vérifier la version Node.js** : `node --version` (recommandé: 18+)
4. **Tester avec un fichier minimal** pour isoler le problème

Cette correction devrait résoudre complètement le problème de styles !
