import http from './http'

// Cities
export async function listCities(q?: string) {
  const res = await http.get('/cities', { params: q ? { q } : undefined })
  return res.data as Array<{ id: number; name: string; country: string }>
}

// Schedules
export async function searchSchedules(params: { departureCityId: number; destinationCityId: number; date?: string }) {
  const res = await http.get('/schedules/search', { params })
  return res.data
}
export async function getSchedule(id: number) {
  const res = await http.get(`/schedules/${id}`)
  return res.data
}

// Users
export async function getUser(id: number) {
  const res = await http.get(`/users/${id}`)
  return res.data
}
export async function updateUser(id: number, payload: any) {
  const res = await http.put(`/users/${id}`, payload)
  return res.data
}
export async function getUserBookings(id: number) {
  const res = await http.get(`/users/${id}/bookings`)
  return res.data
}

// Bookings
export async function listBookings(params?: { userId?: number }) {
  const res = await http.get('/bookings', { params })
  return res.data
}
export async function createBooking(payload: any) {
  const res = await http.post('/bookings', payload)
  return res.data
}
export async function getBooking(id: number) {
  const res = await http.get(`/bookings/${id}`)
  return res.data
}
export async function cancelBooking(id: number, payload?: { reason?: string; refundAmount?: number }) {
  const res = await http.post(`/bookings/${id}/cancel`, payload)
  return res.data
}

// Payments
export async function createPayment(payload: any) {
  const res = await http.post('/payments', payload)
  return res.data
}
export async function getPayment(id: number) {
  const res = await http.get(`/payments/${id}`)
  return res.data
}

// Support tickets
export async function listSupportTickets(params?: { userId?: number }) {
  const res = await http.get('/support-tickets', { params })
  return res.data
}
export async function createSupportTicket(payload: any) {
  const res = await http.post('/support-tickets', payload)
  return res.data
}
export async function updateSupportTicket(id: number, payload: any) {
  const res = await http.put(`/support-tickets/${id}`, payload)
  return res.data
}
export async function deleteSupportTicket(id: number) {
  await http.delete(`/support-tickets/${id}`)
}

// Admin lists
export async function listRoutes(params?: { departureCityId?: number; destinationCityId?: number }) {
  const res = await http.get('/routes', { params })
  return res.data
}
export async function listSchedules() {
  const res = await http.get('/schedules')
  return res.data
}
export async function listBuses() {
  const res = await http.get('/buses')
  return res.data
}
