import * as argon2 from 'argon2'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt/dist'
import { UsersService } from 'src/users/users.service'
import { type LoginDto } from './dto/login.dto'
import { type LoginResponse } from './responses/login-response'
import { type User } from 'src/users/domain/entities/user.entity'
import { type ChangePasswordDto } from './dto/change-password.dto'
import { type CreateUserDto } from 'src/users/domain/dto/user.dto'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login (loginDto: LoginDto): Promise<LoginResponse> {
    const { password, email } = loginDto
    const user = await this.usersService.findByEmail(email)

    const isValidPassword = await argon2.verify(
      user.password,
      password
    )

    if (!isValidPassword) {
      throw new BadRequestException('Credenciales incorrectas')
    }

    const accessToken = this.jwtService.sign({
      email: user.email,
      sub: user.id
    })

    return {
      tokens: { accessToken },
      authenticatedUser: user
    }
  }

  async register (registerDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(registerDto)
    return user
  }

  async changePassword (id: number, changePasswordDto: ChangePasswordDto): Promise<User> {
    return await this.usersService.changePassword(id, changePasswordDto.password)
  }

  async getCurrentUser (currentUser: User): Promise<LoginResponse> {
    const user = await this.usersService.findByEmail(currentUser.email)
    return { authenticatedUser: user }
  }
}
