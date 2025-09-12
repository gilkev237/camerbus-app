interface Booking {
  id: string
  reference: string
  userId: string
  route: string
  departure: string
  destination: string
  date: string
  departureTime: string
  arrivalTime: string
  seats: string[]
  passengers: Passenger[]
  price: number
  totalPrice: number
  status: 'upcoming' | 'completed' | 'cancelled' | 'pending'
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  busNumber: string
  companyName: string
  createdAt: string
  updatedAt: string
  cancellationReason?: string
  refundAmount?: number
  qrCode?: string
  ticketUrl?: string
}

interface Passenger {
  id: string
  name: string
  age: number
  gender: 'M' | 'F'
  idNumber?: string
  phone?: string
  seat: string
}

interface BookingFilters {
  status?: string
  period?: string
  destination?: string
  dateFrom?: string
  dateTo?: string
}

interface BookingStats {
  totalBookings: number
  completedTrips: number
  cancelledBookings: number
  totalSpent: number
  favoriteDestination: string
  averageRating: number
}

class BookingService {
  private static instance: BookingService
  private bookings: Booking[] = []

  private constructor() {
    this.initializeMockData()
  }

  static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService()
    }
    return BookingService.instance
  }

  private initializeMockData(): void {
    this.bookings = [
      {
        id: 'BKG-001',
        reference: 'CMB-12345678',
        userId: '1',
        route: 'Yaoundé → Douala',
        departure: 'Yaoundé',
        destination: 'Douala',
        date: '2024-01-15',
        departureTime: '08:00',
        arrivalTime: '11:30',
        seats: ['A1', 'A2'],
        passengers: [
          {
            id: 'P1',
            name: 'Jean Dupont',
            age: 35,
            gender: 'M',
            idNumber: '123456789',
            phone: '+237 690 123 456',
            seat: 'A1'
          },
          {
            id: 'P2',
            name: 'Marie Dupont',
            age: 32,
            gender: 'F',
            idNumber: '987654321',
            phone: '+237 695 987 654',
            seat: 'A2'
          }
        ],
        price: 3500,
        totalPrice: 7000,
        status: 'completed',
        paymentStatus: 'paid',
        paymentMethod: 'MTN Mobile Money',
        busNumber: 'CM-001',
        companyName: 'CamerBus Express',
        createdAt: '2024-01-10T10:30:00Z',
        updatedAt: '2024-01-15T11:30:00Z',
        qrCode: 'QR_CMB_12345678',
        ticketUrl: '/tickets/CMB-12345678.pdf'
      },
      {
        id: 'BKG-002',
        reference: 'CMB-12345679',
        userId: '1',
        route: 'Douala → Bamenda',
        departure: 'Douala',
        destination: 'Bamenda',
        date: '2024-02-22',
        departureTime: '14:00',
        arrivalTime: '18:30',
        seats: ['B3'],
        passengers: [
          {
            id: 'P3',
            name: 'Jean Dupont',
            age: 35,
            gender: 'M',
            idNumber: '123456789',
            phone: '+237 690 123 456',
            seat: 'B3'
          }
        ],
        price: 4200,
        totalPrice: 4200,
        status: 'upcoming',
        paymentStatus: 'paid',
        paymentMethod: 'Orange Money',
        busNumber: 'CM-002',
        companyName: 'CamerBus VIP',
        createdAt: '2024-02-15T09:15:00Z',
        updatedAt: '2024-02-15T09:15:00Z',
        qrCode: 'QR_CMB_12345679',
        ticketUrl: '/tickets/CMB-12345679.pdf'
      },
      {
        id: 'BKG-003',
        reference: 'CMB-12345680',
        userId: '1',
        route: 'Yaoundé → Bafoussam',
        departure: 'Yaoundé',
        destination: 'Bafoussam',
        date: '2024-01-08',
        departureTime: '10:30',
        arrivalTime: '14:45',
        seats: ['C5'],
        passengers: [
          {
            id: 'P4',
            name: 'Jean Dupont',
            age: 35,
            gender: 'M',
            idNumber: '123456789',
            phone: '+237 690 123 456',
            seat: 'C5'
          }
        ],
        price: 4000,
        totalPrice: 4000,
        status: 'cancelled',
        paymentStatus: 'refunded',
        paymentMethod: 'MTN Mobile Money',
        busNumber: 'CM-003',
        companyName: 'CamerBus Express',
        createdAt: '2024-01-05T14:20:00Z',
        updatedAt: '2024-01-07T16:45:00Z',
        cancellationReason: 'Voyage annulé par le client',
        refundAmount: 3600 // 10% de frais d'annulation
      },
      {
        id: 'BKG-004',
        reference: 'CMB-12345681',
        userId: '1',
        route: 'Douala → Yaoundé',
        departure: 'Douala',
        destination: 'Yaoundé',
        date: '2024-03-10',
        departureTime: '16:00',
        arrivalTime: '19:30',
        seats: ['D1', 'D2'],
        passengers: [
          {
            id: 'P5',
            name: 'Jean Dupont',
            age: 35,
            gender: 'M',
            idNumber: '123456789',
            phone: '+237 690 123 456',
            seat: 'D1'
          },
          {
            id: 'P6',
            name: 'Paul Kamga',
            age: 28,
            gender: 'M',
            idNumber: '456789123',
            phone: '+237 677 888 999',
            seat: 'D2'
          }
        ],
        price: 3500,
        totalPrice: 7000,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'Bank Card',
        busNumber: 'CM-004',
        companyName: 'CamerBus Premium',
        createdAt: '2024-03-05T11:00:00Z',
        updatedAt: '2024-03-05T11:00:00Z'
      }
    ]
  }

  // Obtenir les réservations d'un utilisateur
  async getUserBookings(userId: string, filters?: BookingFilters): Promise<Booking[]> {
    // Simulation d'un délai de requête
    await new Promise(resolve => setTimeout(resolve, 500))

    let userBookings = this.bookings.filter(booking => booking.userId === userId)

    // Appliquer les filtres
    if (filters) {
      if (filters.status) {
        userBookings = userBookings.filter(b => b.status === filters.status)
      }

      if (filters.destination) {
        userBookings = userBookings.filter(b => 
          b.destination.toLowerCase().includes(filters.destination!.toLowerCase()) ||
          b.departure.toLowerCase().includes(filters.destination!.toLowerCase())
        )
      }

      if (filters.period) {
        const now = new Date()
        const filterDate = new Date()

        switch (filters.period) {
          case 'this-month':
            filterDate.setMonth(now.getMonth())
            filterDate.setDate(1)
            break
          case 'last-month':
            filterDate.setMonth(now.getMonth() - 1)
            filterDate.setDate(1)
            break
          case 'this-year':
            filterDate.setFullYear(now.getFullYear())
            filterDate.setMonth(0)
            filterDate.setDate(1)
            break
        }

        if (filters.period !== 'all') {
          userBookings = userBookings.filter(b => new Date(b.date) >= filterDate)
        }
      }

      if (filters.dateFrom) {
        userBookings = userBookings.filter(b => new Date(b.date) >= new Date(filters.dateFrom!))
      }

      if (filters.dateTo) {
        userBookings = userBookings.filter(b => new Date(b.date) <= new Date(filters.dateTo!))
      }
    }

    // Trier par date (plus récent en premier)
    return userBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  // Obtenir une réservation par ID
  async getBookingById(bookingId: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return this.bookings.find(booking => booking.id === bookingId) || null
  }

  // Obtenir une réservation par référence
  async getBookingByReference(reference: string): Promise<Booking | null> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return this.bookings.find(booking => booking.reference === reference) || null
  }

  // Obtenir les statistiques d'un utilisateur
  async getUserStats(userId: string): Promise<BookingStats> {
    await new Promise(resolve => setTimeout(resolve, 400))

    const userBookings = this.bookings.filter(booking => booking.userId === userId)
    
    const totalBookings = userBookings.length
    const completedTrips = userBookings.filter(b => b.status === 'completed').length
    const cancelledBookings = userBookings.filter(b => b.status === 'cancelled').length
    const totalSpent = userBookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((sum, b) => sum + b.totalPrice, 0)

    // Destination favorite
    const destinations: Record<string, number> = {}
    userBookings.forEach(booking => {
      destinations[booking.destination] = (destinations[booking.destination] || 0) + 1
    })
    const favoriteDestination = Object.keys(destinations).reduce((a, b) => 
      destinations[a] > destinations[b] ? a : b, Object.keys(destinations)[0] || 'Aucune'
    )

    return {
      totalBookings,
      completedTrips,
      cancelledBookings,
      totalSpent,
      favoriteDestination,
      averageRating: 4.5 // Simulation d'une note moyenne
    }
  }

  // Annuler une réservation
  async cancelBooking(bookingId: string, reason?: string): Promise<{ success: boolean; message: string; refundAmount?: number }> {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const booking = this.bookings.find(b => b.id === bookingId)
    
    if (!booking) {
      return { success: false, message: 'Réservation introuvable' }
    }

    if (booking.status !== 'upcoming' && booking.status !== 'pending') {
      return { success: false, message: 'Cette réservation ne peut pas être annulée' }
    }

    // Calculer le remboursement selon les conditions
    const now = new Date()
    const departureDate = new Date(booking.date)
    const hoursUntilDeparture = (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    let refundPercentage = 100
    if (hoursUntilDeparture < 24) {
      refundPercentage = 75 // 25% de frais d'annulation
    } else if (hoursUntilDeparture < 48) {
      refundPercentage = 90 // 10% de frais d'annulation
    }

    const refundAmount = Math.round(booking.totalPrice * (refundPercentage / 100))

    // Mettre à jour la réservation
    booking.status = 'cancelled'
    booking.paymentStatus = 'refunded'
    booking.cancellationReason = reason || 'Annulé par le client'
    booking.refundAmount = refundAmount
    booking.updatedAt = new Date().toISOString()

    return {
      success: true,
      message: `Réservation annulée avec succès. Remboursement de ${refundAmount.toLocaleString()} FCFA`,
      refundAmount
    }
  }

  // Télécharger le billet
  async downloadTicket(bookingId: string): Promise<{ success: boolean; message: string; url?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500))

    const booking = this.bookings.find(b => b.id === bookingId)
    
    if (!booking) {
      return { success: false, message: 'Réservation introuvable' }
    }

    if (booking.paymentStatus !== 'paid') {
      return { success: false, message: 'Le paiement doit être confirmé pour télécharger le billet' }
    }

    // Simulation de génération du billet PDF
    const ticketUrl = booking.ticketUrl || `/tickets/${booking.reference}.pdf`

    return {
      success: true,
      message: 'Billet téléchargé avec succès',
      url: ticketUrl
    }
  }

  // Renvoyer le billet par email
  async emailTicket(bookingId: string, email: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 800))

    const booking = this.bookings.find(b => b.id === bookingId)
    
    if (!booking) {
      return { success: false, message: 'Réservation introuvable' }
    }

    if (booking.paymentStatus !== 'paid') {
      return { success: false, message: 'Le paiement doit être confirmé pour envoyer le billet' }
    }

    // Simulation d'envoi d'email
    console.log(`Billet envoyé par email à: ${email}`)

    return {
      success: true,
      message: `Billet envoyé avec succès à ${email}`
    }
  }

  // Créer une nouvelle réservation
  async createBooking(bookingData: Omit<Booking, 'id' | 'reference' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; message: string; booking?: Booking }> {
    await new Promise(resolve => setTimeout(resolve, 1200))

    const newBooking: Booking = {
      ...bookingData,
      id: `BKG-${Date.now()}`,
      reference: `CMB-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.bookings.push(newBooking)

    return {
      success: true,
      message: 'Réservation créée avec succès',
      booking: newBooking
    }
  }

  // Confirmer le paiement d'une réservation
  async confirmPayment(bookingId: string, paymentData: any): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000))

    const booking = this.bookings.find(b => b.id === bookingId)
    
    if (!booking) {
      return { success: false, message: 'Réservation introuvable' }
    }

    // Simulation de traitement du paiement
    const paymentSuccess = Math.random() > 0.1 // 90% de chance de succès

    if (paymentSuccess) {
      booking.paymentStatus = 'paid'
      booking.status = 'upcoming'
      booking.updatedAt = new Date().toISOString()
      booking.qrCode = `QR_${booking.reference}`
      booking.ticketUrl = `/tickets/${booking.reference}.pdf`

      return {
        success: true,
        message: 'Paiement confirmé avec succès'
      }
    } else {
      booking.paymentStatus = 'failed'
      booking.updatedAt = new Date().toISOString()

      return {
        success: false,
        message: 'Échec du paiement. Veuillez réessayer.'
      }
    }
  }
}

// Export du service singleton
export const bookingService = BookingService.getInstance()
export type { Booking, Passenger, BookingFilters, BookingStats }
