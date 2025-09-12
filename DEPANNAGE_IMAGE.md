# 🛠️ Dépannage Image d'Arrière-Plan CamerBus

## ❌ **Problème Identifié**
L'image crée son propre espace au lieu d'être en arrière-plan.

## 🔍 **Causes Possibles et Solutions**

### **1. Image Mal Placée**
✅ **Vérifiez :**
- Votre image doit être dans : `public/bus-hero.jpg`
- Pas dans `src/assets/`
- Nom exact : `bus-hero.jpg` (sans espaces)

### **2. Format d'Image Problématique**
✅ **Formats supportés :**
- ✅ `.jpg`, `.jpeg`, `.png`, `.webp`
- ❌ `.bmp`, `.tiff`, `.gif` (peuvent poser problème)

### **3. Nom de Fichier avec Espaces**
❌ **Problématique :** `mon bus.jpg`
✅ **Correct :** `bus-hero.jpg` ou `mon-bus.jpg`

### **4. Taille d'Image Trop Grande**
✅ **Optimisez :**
- Largeur max : 1920px
- Poids max : 2MB
- Format recommandé : JPG

## 🔧 **Solutions de Réparation**

### **Solution 1 : Vérification Simple**
```bash
# Dans votre projet, vérifiez que ce fichier existe :
public/bus-hero.jpg
```

### **Solution 2 : Nom Personnalisé**
Si votre image a un autre nom, modifiez dans `src/assets/main.css` :
```css
.bg-bus-hero {
  background-image: url('/VOTRE-NOM-IMAGE.jpg') !important;
}
```

### **Solution 3 : Test de Diagnostic**
Ajoutez temporairement cette classe dans `Home.vue` pour tester :
```html
<section class="relative bg-bus-hero-alt overflow-hidden">
```

### **Solution 4 : Chemin Alternatif**
Si l'image est dans `src/assets/`, utilisez :
```css
.bg-bus-hero {
  background-image: url('@/assets/votre-image.jpg') !important;
}
```

## 🚨 **Vérifications Obligatoires**

### ✅ **Checklist :**
- [ ] Image dans `public/bus-hero.jpg`
- [ ] Nom sans espaces ni caractères spéciaux
- [ ] Format JPG, PNG ou WebP
- [ ] Taille < 2MB
- [ ] Serveur redémarré (`npm run dev`)
- [ ] Cache navigateur vidé (Ctrl+F5)

### 🔍 **Test de Fonctionnement :**
1. Ouvrez les **outils développeur** (F12)
2. Onglet **Network** 
3. Rechargez la page
4. Cherchez `bus-hero.jpg` dans la liste
5. **Statut 200** = ✅ Image trouvée
6. **Statut 404** = ❌ Image introuvable

## 🎯 **Solutions Alternatives**

### **Option 1 : URL Directe**
```css
.bg-bus-hero {
  background-image: url('https://votre-lien-image.jpg') !important;
}
```

### **Option 2 : Image Inline** 
Ajoutez dans `Home.vue` template :
```html
<div class="absolute inset-0">
  <img src="/bus-hero.jpg" class="w-full h-full object-cover" alt="Bus CamerBus">
</div>
```

### **Option 3 : Retour au Gradient**
Dans `Home.vue`, ligne 4 :
```html
<section class="relative bg-cameroon-gradient overflow-hidden">
```

## 📞 **Si Rien ne Marche**

Donnez-moi ces informations :
1. Nom exact de votre fichier image
2. Emplacement où vous l'avez mise
3. Format de l'image (JPG, PNG, etc.)
4. Taille du fichier

Et je vous aiderai spécifiquement !
