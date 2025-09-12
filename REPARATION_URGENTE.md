# 🚨 Réparation Urgente - Page Blanche CamerBus

## ❌ **Problème : Tout est Blanc**

Cela arrive quand TailwindCSS ne se compile pas correctement ou que le cache pose problème.

## 🛠️ **Solutions par Ordre de Priorité**

### **🔥 Solution 1 : Nettoyage Complet (OBLIGATOIRE)**
```bash
# 1. Arrêter le serveur (Ctrl+C)

# 2. Supprimer node_modules et cache
rm -rf node_modules
rm -rf package-lock.json
rm -rf .vite

# 3. Réinstaller proprement
npm install

# 4. Redémarrer
npm run dev
```

### **🔥 Solution 2 : Vérifier TailwindCSS**
```bash
# Réinstaller TailwindCSS
npm install -D tailwindcss postcss autoprefixer

# Reconfigurer
npx tailwindcss init -p
```

### **🔥 Solution 3 : Forcer la Compilation CSS**
Modifiez `src/assets/main.css` :
```css
@import './base.css';

/* FORCER TAILWIND */
@tailwind base;
@tailwind components; 
@tailwind utilities;

/* TEST COULEUR */
body {
  background-color: #f3f4f6 !important;
}

/* FORCER L'IMAGE */
.bg-bus-hero {
  background: #1f2937 url('/bus-hero.jpg') no-repeat center center !important;
  background-size: cover !important;
  min-height: 80vh !important;
}
```

## 🔧 **Si les Solutions ne Marchent Pas**

### **Plan B : CSS Manuel (Sans TailwindCSS)**
Remplacez TOUT le contenu de `src/assets/main.css` par :

```css
/* RESET COMPLET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, -apple-system, system-ui, sans-serif;
  background-color: #f9fafb;
  color: #1f2937;
}

/* HEADER */
header {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #22c55e, #15803d, #fbbf24);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #22c55e;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: #22c55e;
  color: white;
}

.btn-primary:hover {
  background: #16a34a;
}

.btn-secondary {
  background: transparent;
  color: #6b7280;
}

/* HERO SECTION */
.hero {
  background-image: url('/bus-hero.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  color: white;
}

.hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.search-form {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  max-width: 800px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.search-button {
  width: 100%;
  background: #22c55e;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.search-button:hover {
  background: #16a34a;
}

/* SECTIONS */
.section {
  padding: 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1f2937;
}

.section-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 3rem;
}

/* CARTES */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* FOOTER */
footer {
  background: #1f2937;
  color: white;
  padding: 3rem 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .hero h1 {
    font-size: 2rem;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
}
```

## 🔥 **Application du Plan B**

1. **Copiez le CSS ci-dessus** dans `src/assets/main.css`
2. **Redémarrez** : `npm run dev`
3. **Testez** : La page devrait redevenir normale

## 📞 **Diagnostic Final**

Si ça ne marche toujours pas :
1. **Ouvrez F12** dans votre navigateur
2. **Onglet Console** - Y a-t-il des erreurs ?
3. **Onglet Network** - Le fichier CSS se charge-t-il ?
4. **Donnez-moi ces infos** et je vous aiderai spécifiquement

Cette solution devrait résoudre le problème de page blanche !
