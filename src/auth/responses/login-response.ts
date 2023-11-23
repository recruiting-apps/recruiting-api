import { type User } from 'src/users/domain/entities/user.entity'

export interface Tokens {
  accessToken: string
}

export interface LoginResponse {
  tokens?: Tokens
  authenticatedUser: User
}
