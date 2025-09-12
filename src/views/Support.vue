<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header Section -->
    <div class="bg-white border-b border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-display font-bold text-neutral-900 mb-4">
            Centre de Support CamerBus
          </h1>
          <p class="text-lg text-neutral-600 max-w-2xl mx-auto">
            Nous sommes là pour vous aider ! Trouvez des réponses rapides ou contactez notre équipe
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Chat Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-soft overflow-hidden">
            <!-- Chat Header -->
            <div class="bg-primary-600 text-white p-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold">Chat en Direct</h3>
                    <p class="text-sm text-white/80" :class="{'text-green-300': isOnline, 'text-red-300': !isOnline}">
                      {{ isOnline ? '🟢 En ligne' : '🔴 Hors ligne' }}
                    </p>
                  </div>
                </div>
                <button 
                  @click="toggleChat"
                  class="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Chat Messages -->
            <div class="h-96 overflow-y-auto p-4 space-y-4" ref="chatContainer">
              <div 
                v-for="message in messages" 
                :key="message.id"
                class="flex"
                :class="{'justify-end': message.sender === 'user', 'justify-start': message.sender === 'support'}"
              >
                <div 
                  class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg"
                  :class="{
                    'bg-primary-600 text-white': message.sender === 'user',
                    'bg-neutral-100 text-neutral-900': message.sender === 'support'
                  }"
                >
                  <p class="text-sm">{{ message.text }}</p>
                  <p class="text-xs mt-1 opacity-70">{{ formatTime(message.timestamp) }}</p>
                </div>
              </div>
              <div v-if="isTyping" class="flex justify-start">
                <div class="bg-neutral-100 px-4 py-2 rounded-lg">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chat Input -->
            <div class="border-t border-neutral-200 p-4">
              <form @submit.prevent="sendMessage" class="flex space-x-3">
                <input
                  v-model="newMessage"
                  type="text"
                  placeholder="Tapez votre message..."
                  class="flex-1 input-field"
                  :disabled="!isOnline"
                />
                <button
                  type="submit"
                  :disabled="!newMessage.trim() || !isOnline"
                  class="btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button 
              v-for="action in quickActions"
              :key="action.title"
              @click="sendQuickMessage(action.message)"
              class="p-4 bg-white rounded-lg shadow-soft hover:shadow-md transition-shadow text-left"
            >
              <div class="text-2xl mb-2">{{ action.icon }}</div>
              <h4 class="font-semibold text-neutral-900">{{ action.title }}</h4>
              <p class="text-sm text-neutral-600">{{ action.description }}</p>
            </button>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Contact Direct</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-neutral-900">+237 6XX XXX XXX</p>
                  <p class="text-sm text-neutral-600">Lun-Ven 8h-18h</p>
                </div>
              </div>
              
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-neutral-900">support@camerbus.cm</p>
                  <p class="text-sm text-neutral-600">Réponse sous 24h</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-neutral-900">Douala, Cameroun</p>
                  <p class="text-sm text-neutral-600">Siège social</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="bg-white rounded-xl shadow-soft p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">État du Service</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-600">Réservations</span>
                <span class="flex items-center text-green-600">
                  <div class="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Opérationnel
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-600">Paiements</span>
                <span class="flex items-center text-green-600">
                  <div class="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Opérationnel
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-neutral-600">Support</span>
                <span class="flex items-center text-green-600">
                  <div class="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
                  Disponible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <div class="bg-white rounded-xl shadow-soft overflow-hidden">
          <div class="bg-neutral-50 border-b border-neutral-200 p-6">
            <h2 class="text-2xl font-display font-bold text-neutral-900 mb-4">
              Questions Fréquemment Posées
            </h2>
            
            <!-- Search FAQ -->
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher dans la FAQ..."
                class="w-full input-field pl-10"
              />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>

            <!-- Categories -->
            <div class="flex flex-wrap gap-2 mt-4">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = selectedCategory === category ? '' : category"
                class="px-3 py-1 text-sm rounded-full transition-colors"
                :class="{
                  'bg-primary-600 text-white': selectedCategory === category,
                  'bg-neutral-200 text-neutral-700 hover:bg-neutral-300': selectedCategory !== category
                }"
              >
                {{ category }}
              </button>
            </div>
          </div>

          <div class="p-6">
            <div class="space-y-4">
              <div 
                v-for="faq in filteredFAQs" 
                :key="faq.id"
                class="border border-neutral-200 rounded-lg overflow-hidden"
              >
                <button
                  @click="faq.isOpen = !faq.isOpen"
                  class="w-full p-4 text-left bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center justify-between"
                >
                  <span class="font-medium text-neutral-900">{{ faq.question }}</span>
                  <svg 
                    class="w-5 h-5 text-neutral-500 transition-transform"
                    :class="{'rotate-180': faq.isOpen}"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </button>
                <div 
                  v-if="faq.isOpen"
                  class="p-4 bg-white border-t border-neutral-200"
                >
                  <p class="text-neutral-700 leading-relaxed">{{ faq.answer }}</p>
                  <div class="mt-3 flex items-center space-x-4 text-sm text-neutral-500">
                    <button class="hover:text-primary-600 transition-colors">
                      👍 Utile ({{ faq.helpful || 0 }})
                    </button>
                    <button class="hover:text-primary-600 transition-colors">
                      👎 Pas utile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- No results -->
            <div v-if="filteredFAQs.length === 0" class="text-center py-8">
              <svg class="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.01-5.824-2.562"/>
              </svg>
              <p class="text-neutral-600">Aucun résultat trouvé pour votre recherche.</p>
              <button 
                @click="startChat"
                class="mt-4 btn-primary"
              >
                Poser une question au chat
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="mt-12">
        <div class="bg-white rounded-xl shadow-soft p-6">
          <h2 class="text-2xl font-display font-bold text-neutral-900 mb-6">
            Formulaire de Contact
          </h2>
          
          <form @submit.prevent="submitContactForm" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nom complet</label>
              <input v-model="contactForm.name" type="text" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input v-model="contactForm.email" type="email" required class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Téléphone</label>
              <input v-model="contactForm.phone" type="tel" class="input-field" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Sujet</label>
              <select v-model="contactForm.subject" required class="input-field">
                <option value="">S��lectionnez un sujet</option>
                <option value="reservation">Problème de réservation</option>
                <option value="payment">Problème de paiement</option>
                <option value="refund">Demande de remboursement</option>
                <option value="technical">Problème technique</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Message</label>
              <textarea 
                v-model="contactForm.message" 
                rows="4" 
                required 
                class="input-field"
                placeholder="Décrivez votre problème ou votre question..."
              ></textarea>
            </div>
            
            <div class="lg:col-span-2">
              <button 
                type="submit" 
                class="btn-primary w-full sm:w-auto"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, reactive } from 'vue'

// Chat functionality
const isOnline = ref(true)
const newMessage = ref('')
const isTyping = ref(false)
const chatContainer = ref<HTMLElement>()

interface Message {
  id: number
  sender: 'user' | 'support'
  text: string
  timestamp: Date
}

const messages = ref<Message[]>([
  {
    id: 1,
    sender: 'support',
    text: 'Bonjour ! Bienvenue sur le support CamerBus. Comment puis-je vous aider aujourd\'hui ?',
    timestamp: new Date()
  }
])

const quickActions = [
  {
    icon: '🎫',
    title: 'Ma réservation',
    description: 'Problème avec une réservation',
    message: 'J\'ai un problème avec ma réservation'
  },
  {
    icon: '💳',
    title: 'Paiement',
    description: 'Question sur un paiement',
    message: 'J\'ai une question concernant un paiement'
  },
  {
    icon: '🔄',
    title: 'Remboursement',
    description: 'Demande de remboursement',
    message: 'Je souhaite demander un remboursement'
  }
]

// FAQ functionality
const searchQuery = ref('')
const selectedCategory = ref('')

const categories = ['Général', 'Réservation', 'Paiement', 'Annulation', 'Compte']

const faqs = ref([
  {
    id: 1,
    category: 'Réservation',
    question: 'Comment puis-je réserver un billet ?',
    answer: 'Vous pouvez réserver un billet en utilisant notre moteur de recherche sur la page d\'accueil. Sélectionnez votre ville de départ, destination, date et nombre de passagers, puis choisissez parmi les options disponibles.',
    isOpen: false,
    helpful: 15
  },
  {
    id: 2,
    category: 'Paiement',
    question: 'Quels sont les moyens de paiement acceptés ?',
    answer: 'Nous acceptons MTN Mobile Money, Orange Money et les cartes bancaires Visa/Mastercard. Tous les paiements sont sécurisés et cryptés.',
    isOpen: false,
    helpful: 23
  },
  {
    id: 3,
    category: 'Annulation',
    question: 'Puis-je annuler ma réservation ?',
    answer: 'Oui, vous pouvez annuler votre réservation jusqu\'à 24h avant le départ. Les frais d\'annulation varient selon le délai : gratuit jusqu\'à 48h avant, 10% entre 24-48h, 25% moins de 24h.',
    isOpen: false,
    helpful: 8
  },
  {
    id: 4,
    category: 'Général',
    question: 'Comment recevoir mon billet électronique ?',
    answer: 'Après confirmation du paiement, votre e-ticket sera envoyé par email et sera également disponible dans votre espace personnel. Vous pouvez le télécharger en PDF ou présenter le QR code.',
    isOpen: false,
    helpful: 19
  },
  {
    id: 5,
    category: 'Compte',
    question: 'Comment créer un compte ?',
    answer: 'Cliquez sur "S\'inscrire" en haut de la page et remplissez le formulaire avec vos informations. Vous recevrez un email de confirmation pour activer votre compte.',
    isOpen: false,
    helpful: 12
  },
  {
    id: 6,
    category: 'Réservation',
    question: 'Puis-je choisir ma place ?',
    answer: 'Oui, lors du processus de réservation, vous pouvez sélectionner votre place préférée sur le plan du bus. Certaines places premium peuvent avoir un supplément.',
    isOpen: false,
    helpful: 7
  }
])

// Contact form
const isSubmitting = ref(false)
const contactForm = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// Computed properties
const filteredFAQs = computed(() => {
  let filtered = faqs.value

  if (selectedCategory.value) {
    filtered = filtered.filter(faq => faq.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.answer.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  const userMessage: Message = {
    id: Date.now(),
    sender: 'user',
    text: newMessage.value.trim(),
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  newMessage.value = ''

  // Scroll to bottom
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }

  // Simulate typing and response
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    const responses = [
      'Merci pour votre message. Un agent va vous répondre sous peu.',
      'Je comprends votre préoccupation. Laissez-moi vérifier cela pour vous.',
      'C\'est une excellente question ! Permettez-moi de vous donner plus d\'informations.',
      'Je vais transférer votre demande au service approprié qui vous répondra rapidement.'
    ]
    
    const supportMessage: Message = {
      id: Date.now() + 1,
      sender: 'support',
      text: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date()
    }
    
    messages.value.push(supportMessage)
    
    nextTick(() => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
      }
    })
  }, 2000)
}

const sendQuickMessage = (message: string) => {
  newMessage.value = message
  sendMessage()
}

const startChat = () => {
  newMessage.value = `J'ai une question qui n'est pas dans la FAQ: ${searchQuery.value}`
  sendMessage()
}

const toggleChat = () => {
  // Toggle chat functionality could be implemented here
  console.log('Chat toggled')
}

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

import { createSupportTicket } from '@/services/api'
import { authService } from '@/services/authService'

const submitContactForm = async () => {
  isSubmitting.value = true
  try {
    const current = authService.getCurrentUser()
    const userId = current?.id ? Number(current.id) : undefined

    const subjectMap: Record<string, string> = {
      reservation: 'Problème de réservation',
      payment: 'Problème de paiement',
      refund: 'Demande de remboursement',
      technical: 'Problème technique',
      other: 'Autre'
    }

    const payload = {
      userId,
      subject: subjectMap[contactForm.subject as keyof typeof subjectMap] || 'Support',
      description: `Nom: ${contactForm.name}\nEmail: ${contactForm.email}\nTéléphone: ${contactForm.phone || 'N/A'}\n\nMessage:\n${contactForm.message}`,
      priority: contactForm.subject === 'payment' || contactForm.subject === 'refund' ? 'high' : 'medium'
    }

    await createSupportTicket(payload)

    Object.keys(contactForm).forEach(key => {
      contactForm[key as keyof typeof contactForm] = ''
    })

    alert('Votre message a été envoyé avec succès ! Notre équipe vous répondra sous peu.')
  } catch (e) {
    alert('Échec de l\'envoi du message. Réessayez plus tard.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
