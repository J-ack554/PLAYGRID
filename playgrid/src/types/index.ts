export type SportType =
  | 'Cricket'
  | 'Football'
  | 'Badminton'
  | 'Tennis'
  | 'Athletics'
  | 'Basketball'
  | 'Kabaddi'
  | 'Hockey'
  | 'Volleyball'
  | 'Table Tennis'
  | 'Swimming'
  | 'Chess'

export type TournamentType = 'Amateur' | 'Professional' | 'School' | 'College' | 'Corporate' | 'Open'

export type RegistrationStatus = 'Open' | 'Closing Soon' | 'Closed' | 'Upcoming'

export interface Tournament {
  id: string
  title: string
  sport: SportType
  location: string
  state: string
  city: string
  isTamilNadu: boolean
  venue: string
  startDate: string // ISO date
  endDate: string // ISO date
  registrationDeadline: string // ISO date
  prizeMoney: number
  entryFee: number
  tournamentType: TournamentType
  status: RegistrationStatus
  imageUrl: string
  description: string
  organizer: string
  contactEmail?: string
  maxParticipants?: number
  registeredCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface Registration {
  id: string
  tournamentId: string
  tournamentTitle: string
  userId: string
  userName: string
  userEmail: string
  phone: string
  teamName?: string
  sport: SportType
  status: 'Pending' | 'Confirmed' | 'Rejected'
  createdAt: string
}

export type NewsCategory = SportType | 'General'

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: NewsCategory
  imageUrl: string
  author: string
  source?: string
  sourceUrl?: string
  publishedAt: string
  featured?: boolean
}

export interface Coach {
  id: string
  name: string
  sport: SportType
  location: string
  experienceYears: number
  achievements: string[]
  bio: string
  imageUrl: string
  rating?: number
  contactEmail?: string
  phone?: string
  price?: string
  certifications?: string[]
}

export interface UserProfile {
  uid: string
  name: string
  email: string
  phone?: string
  location?: string
  favoriteSports?: SportType[]
  role: 'user' | 'admin'
  createdAt: string
  photoURL?: string
}
