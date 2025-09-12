import axios from 'axios'
import { authService } from './authService'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

export const http = axios.create({
  baseURL,
  timeout: 20000,
})

http.interceptors.request.use((config) => {
  const token = authService.getToken?.()
  if (token) {
    config.headers = config.headers || {}
    ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      try {
        authService.logout?.()
      } catch {}
    }
    return Promise.reject(err)
  }
)

export default http
