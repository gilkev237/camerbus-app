interface User {
  id: string
  fullName: string
  email: string
  phone: string
  level: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  joinDate: string
  isVerified: boolean
  loyaltyPoints: number
}

interface LoginCredentials {
  email: string
  password: string
  remember?: boolean
}

interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
}

class AuthService {
  private static instance: AuthService
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    token: null
  }
  private listeners = new Set<(state: AuthState) => void>()

  // Simulation d'une base de données utilisateurs
  private users: Array<User & { password: string }> = []

  // Comptes par défaut
  private defaultUsers: Array<User & { password: string }> = [
    {
      id: '1',
      fullName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+237 690 123 456',
      password: 'password123',
      level: 'Silver',
      joinDate: '2023-01-15',
      isVerified: true,
      loyaltyPoints: 2850
    },
    {
      id: '2',
      fullName: 'Marie Kamga',
      email: 'marie.kamga@email.com',
      phone: '+237 695 789 012',
      password: 'password456',
      level: 'Gold',
      joinDate: '2022-08-10',
      isVerified: true,
      loyaltyPoints: 7200
    }
  ]

  private constructor() {
    this.loadUsers()
    this.loadStoredAuth()
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService()
    }
    return AuthService.instance
  }

  // Charger les utilisateurs depuis le localStorage
  private loadUsers(): void {
    try {
      const storedUsers = localStorage.getItem('camerbus_users')
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
      } else {
        // Si aucun utilisateur stocké, utiliser les comptes par défaut
        this.users = [...this.defaultUsers]
        this.saveUsers()
      }
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error)
      this.users = [...this.defaultUsers]
      this.saveUsers()
    }
  }

  // Sauvegarder les utilisateurs dans le localStorage
  private saveUsers(): void {
    try {
      localStorage.setItem('camerbus_users', JSON.stringify(this.users))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des utilisateurs:', error)
    }
  }

  // Charger l'authentification depuis le localStorage
  private loadStoredAuth(): void {
    try {
      const storedAuth = localStorage.getItem('camerbus_auth')
      if (storedAuth) {
        const authData = JSON.parse(storedAuth)
        if (this.isTokenValid(authData.token)) {
          this.state = authData
          this.notify()
        } else {
          this.clearStoredAuth()
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de l\'authentification:', error)
      this.clearStoredAuth()
    }
  }

  // Sauvegarder l'authentification dans le localStorage
  private saveAuth(remember: boolean = false): void {
    if (remember) {
      localStorage.setItem('camerbus_auth', JSON.stringify(this.state))
    } else {
      sessionStorage.setItem('camerbus_auth', JSON.stringify(this.state))
    }
  }

  // Abonnements aux changements d'auth
  onAuthChange(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener)
    listener({ ...this.state, user: this.state.user ? { ...this.state.user } : null })
    return () => this.listeners.delete(listener)
  }
  private notify() {
    this.listeners.forEach(l => l({ ...this.state, user: this.state.user ? { ...this.state.user } : null }))
  }

  // Supprimer l'authentification stockée
  private clearStoredAuth(): void {
    localStorage.removeItem('camerbus_auth')
    sessionStorage.removeItem('camerbus_auth')
  }

  // Vérifier si le token est valide (simulation)
  private isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp > Date.now() / 1000
    } catch {
      return false
    }
  }

  // Générer un token JWT simulé
  private generateToken(userId: string): string {
    const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }))
    const payload = btoa(JSON.stringify({
      userId,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 heures
    }))
    const signature = btoa('signature_simulee')
    return `${header}.${payload}.${signature}`
  }

  // Connexion
  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = this.users.find(u => u.email === credentials.email)
      
      if (!user) {
        return { success: false, message: 'Email ou mot de passe incorrect' }
      }

      if (user.password !== credentials.password) {
        return { success: false, message: 'Email ou mot de passe incorrect' }
      }

      if (!user.isVerified) {
        return { success: false, message: 'Votre compte n\'est pas encore vérifié. Vérifiez votre email.' }
      }

      // Créer l'utilisateur sans le mot de passe
      const { password, ...userWithoutPassword } = user
      
      this.state = {
        user: userWithoutPassword,
        isAuthenticated: true,
        token: this.generateToken(user.id)
      }

      this.saveAuth(credentials.remember)
      this.notify()

      return { 
        success: true, 
        message: 'Connexion réussie !', 
        user: userWithoutPassword 
      }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de la connexion' }
    }
  }

  // Inscription
  async register(data: RegisterData): Promise<{ success: boolean; message: string }> {
    try {
      // Validation
      if (data.password !== data.confirmPassword) {
        return { success: false, message: 'Les mots de passe ne correspondent pas' }
      }

      if (data.password.length < 6) {
        return { success: false, message: 'Le mot de passe doit contenir au moins 6 caractères' }
      }

      if (!data.acceptTerms) {
        return { success: false, message: 'Vous devez accepter les conditions d\'utilisation' }
      }

      // Vérifier si l'email existe déjà
      if (this.users.find(u => u.email === data.email)) {
        return { success: false, message: 'Un compte avec cet email existe déjà' }
      }

      // Vérifier si le téléphone existe déjà
      if (this.users.find(u => u.phone === data.phone)) {
        return { success: false, message: 'Un compte avec ce numéro de téléphone existe déjà' }
      }

      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Créer le nouvel utilisateur
      const newUser = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        level: 'Bronze' as const,
        joinDate: new Date().toISOString().split('T')[0],
        isVerified: true, // Pour simplifier la démo, on active directement
        loyaltyPoints: 0
      }

      this.users.push(newUser)
      this.saveUsers() // Sauvegarder immédiatement

      // Simulation d'envoi d'email de vérification
      console.log('Email de vérification envoyé à:', data.email)

      return {
        success: true,
        message: 'Inscription réussie ! Vous pouvez maintenant vous connecter.'
      }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de l\'inscription' }
    }
  }

  // Demande de réinitialisation de mot de passe
  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = this.users.find(u => u.email === email)

      if (!user) {
        // Pour des raisons de sécurité, on ne révèle pas si l'email existe
        return {
          success: true,
          message: 'Si cet email existe dans notre système, vous recevrez un lien de réinitialisation.'
        }
      }

      // Stocker l'email pour la réinitialisation (simulation de token)
      localStorage.setItem('camerbus_reset_email', email)

      // Simulation d'envoi d'email de réinitialisation
      console.log('Email de réinitialisation envoyé à:', email)

      return {
        success: true,
        message: 'Si cet email existe dans notre système, vous recevrez un lien de réinitialisation.'
      }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue' }
    }
  }

  // Réinitialisation de mot de passe
  async resetPassword(token: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (newPassword.length < 6) {
        return { success: false, message: 'Le mot de passe doit contenir au moins 6 caractères' }
      }

      // Simulation de validation de token
      if (token !== 'valid_reset_token') {
        return { success: false, message: 'Token de réinitialisation invalide ou expiré' }
      }

      // Récupérer l'email stocké pour la réinitialisation
      const resetEmail = localStorage.getItem('camerbus_reset_email')
      if (!resetEmail) {
        return { success: false, message: 'Session de réinitialisation expirée' }
      }

      // Trouver et mettre à jour l'utilisateur
      const userIndex = this.users.findIndex(u => u.email === resetEmail)
      if (userIndex === -1) {
        return { success: false, message: 'Utilisateur introuvable' }
      }

      // Mettre à jour le mot de passe
      this.users[userIndex].password = newPassword
      this.saveUsers() // Sauvegarder les changements

      // Nettoyer la session de réinitialisation
      localStorage.removeItem('camerbus_reset_email')

      console.log('Mot de passe réinitialisé avec succès pour:', resetEmail)

      return { success: true, message: 'Mot de passe réinitialisé avec succès !' }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de la réinitialisation' }
    }
  }

  // Vérification d'email
  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 500))

      // Simulation de validation de token
      if (token !== 'valid_verification_token') {
        return { success: false, message: 'Token de vérification invalide ou expiré' }
      }

      // Simulation de vérification de l'email
      console.log('Email vérifié avec succès')

      return { success: true, message: 'Email vérifié avec succès ! Vous pouvez maintenant vous connecter.' }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de la vérification' }
    }
  }

  // Déconnexion
  logout(): void {
    this.state = {
      user: null,
      isAuthenticated: false,
      token: null
    }
    this.clearStoredAuth()
    this.notify()
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.state.user
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.state.isAuthenticated && this.state.token !== null
  }

  // Obtenir le token
  getToken(): string | null {
    return this.state.token
  }

  // Mettre à jour les informations utilisateur
  async updateProfile(updates: Partial<User>): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.state.user) {
        return { success: false, message: 'Utilisateur non connecté' }
      }

      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mettre à jour l'utilisateur dans la "base de données"
      const userIndex = this.users.findIndex(u => u.id === this.state.user!.id)
      if (userIndex !== -1) {
        Object.assign(this.users[userIndex], updates)
        this.saveUsers() // Sauvegarder les utilisateurs

        // Mettre à jour l'état local
        this.state.user = { ...this.state.user, ...updates }

        // Sauvegarder dans le stockage
        const isRemembered = localStorage.getItem('camerbus_auth') !== null
        this.saveAuth(isRemembered)
        this.notify()
      }

      return { success: true, message: 'Profil mis à jour avec succès !' }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors de la mise à jour' }
    }
  }

  // Changer le mot de passe
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.state.user) {
        return { success: false, message: 'Utilisateur non connecté' }
      }

      // Simulation d'un délai de requête
      await new Promise(resolve => setTimeout(resolve, 1000))

      const user = this.users.find(u => u.id === this.state.user!.id)
      if (!user || user.password !== currentPassword) {
        return { success: false, message: 'Mot de passe actuel incorrect' }
      }

      if (newPassword.length < 6) {
        return { success: false, message: 'Le nouveau mot de passe doit contenir au moins 6 caractères' }
      }

      user.password = newPassword
      this.saveUsers() // Sauvegarder les changements

      return { success: true, message: 'Mot de passe changé avec succès !' }
    } catch (error) {
      return { success: false, message: 'Une erreur est survenue lors du changement de mot de passe' }
    }
  }
}

// Export du service singleton
export const authService = AuthService.getInstance()
export type { User, LoginCredentials, RegisterData, AuthState }
