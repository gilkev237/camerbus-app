<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="visible"
        :class="[
          'fixed top-4 right-4 z-50 min-w-96 max-w-md rounded-lg shadow-lg border p-4',
          typeClasses[type]
        ]"
      >
        <div class="flex items-start space-x-3">
          <!-- Icon -->
          <div :class="iconClasses[type]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="iconPaths[type]"
              />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 v-if="title" :class="titleClasses[type]">{{ title }}</h4>
            <p :class="messageClasses[type]">{{ message }}</p>
          </div>

          <!-- Close button -->
          <button
            @click="close"
            :class="closeButtonClasses[type]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Progress bar for auto-close -->
        <div
          v-if="duration > 0"
          class="absolute bottom-0 left-0 h-1 bg-current opacity-30 transition-all duration-100"
          :style="{ width: progressWidth + '%' }"
        ></div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number // milliseconds, 0 for no auto-close
}

const props = withDefaults(defineProps<NotificationProps>(), {
  type: 'info',
  duration: 5000
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)
const progressWidth = ref(100)
let progressInterval: NodeJS.Timeout | null = null
let autoCloseTimeout: NodeJS.Timeout | null = null

const typeClasses = {
  success: 'bg-green-50 border-green-200',
  error: 'bg-red-50 border-red-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-blue-50 border-blue-200'
}

const iconClasses = {
  success: 'flex-shrink-0 w-6 h-6 text-green-600',
  error: 'flex-shrink-0 w-6 h-6 text-red-600',
  warning: 'flex-shrink-0 w-6 h-6 text-yellow-600',
  info: 'flex-shrink-0 w-6 h-6 text-blue-600'
}

const titleClasses = {
  success: 'font-medium text-green-800 mb-1',
  error: 'font-medium text-red-800 mb-1',
  warning: 'font-medium text-yellow-800 mb-1',
  info: 'font-medium text-blue-800 mb-1'
}

const messageClasses = {
  success: 'text-sm text-green-700',
  error: 'text-sm text-red-700',
  warning: 'text-sm text-yellow-700',
  info: 'text-sm text-blue-700'
}

const closeButtonClasses = {
  success: 'flex-shrink-0 text-green-600 hover:text-green-800 transition-colors',
  error: 'flex-shrink-0 text-red-600 hover:text-red-800 transition-colors',
  warning: 'flex-shrink-0 text-yellow-600 hover:text-yellow-800 transition-colors',
  info: 'flex-shrink-0 text-blue-600 hover:text-blue-800 transition-colors'
}

const iconPaths = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 18L18 6M6 6l12 12',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

const close = () => {
  visible.value = false
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
  }
  
  // Delay emit to allow transition to complete
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  visible.value = true

  if (props.duration > 0) {
    // Auto-close timer
    autoCloseTimeout = setTimeout(() => {
      close()
    }, props.duration)

    // Progress bar animation
    const stepDuration = 100 // Update every 100ms
    const totalSteps = props.duration / stepDuration
    let currentStep = 0

    progressInterval = setInterval(() => {
      currentStep++
      progressWidth.value = 100 - (currentStep / totalSteps) * 100
      
      if (currentStep >= totalSteps) {
        if (progressInterval) {
          clearInterval(progressInterval)
        }
      }
    }, stepDuration)
  }
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
  }
})
</script>
