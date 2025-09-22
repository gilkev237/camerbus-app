// Shared API types inferred from backend models/controllers

export interface City {
  id: number
  name: string
  country?: string

}

export interface RouteModel {
  id: number
  departureCityId: number
  destinationCityId: number
  basePrice?: number
  distanceKm?: number
  status?: string
  departureCity?: City
  destinationCity?: City
}

export type BusStatus = 'operational' | 'maintenance' | 'out-of-service'

export interface Bus {
  id: number
  number: string
  type: string
  capacity: number
  status: BusStatus
  lastMaintenance?: string
}

export interface Schedule {
  id: number
  routeId: number
  busId: number
  departureAt: string
  arrivalAt: string
  price?: number
  status?: string
  route?: RouteModel
  bus?: Bus
  bookings?: Booking[]
  departure_at?: string
}

export interface BookingPassenger {
  id?: number
  bookingId?: number
  fullName: string
  phone: string
  email?: string
  idType?: string
  idNumber?: string
  seat: string
}

export interface Payment {
  id: number
  bookingId: number
  amount: number
  method: string
  status: string
  transactionId?: string
  paymentDate?: string
  booking?: Booking
}

export interface UserSettings {
  emailConfirmation?: boolean
  travelReminders?: boolean
  promotions?: boolean
}

export interface User {
  id: number
  fullName: string
  email: string
  phone: string
  level?: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  joinDate?: string
  isVerified?: boolean
  loyaltyPoints?: number
  gender?: 'M' | 'F' | 'Other'
  birthDate?: string
  cityId?: number
  city?: City
  settings?: UserSettings
}

export interface Booking {
  id: number
  userId: number
  scheduleId: number
  reference: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentStatus?: string
  paymentMethod?: string
  cancellationReason?: string
  refundAmount?: number
  schedule?: Schedule
  passengers?: BookingPassenger[]
  payment?: Payment
  user?: User
  createdAt?: string
  created_at?: string

}

export interface SupportTicket {
  id: number
  subject: string
  userId?: number
  description: string
  priority?: 'low' | 'medium' | 'high'
  status?: 'open' | 'in-progress' | 'closed'
  assignedToAdminId?: number | null
  lastRepliedAt?: string
  createdAt?: string
  created_at?: string

}

export interface Ticket {
  id: number;
  subject: string;
  userId?: number;
  description: string;
  created?: string
}
