import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../domain/entities/user.entity'
import { Repository } from 'typeorm'
import { type UpdateUserDto, type CreateUserDto } from '../domain/dto/user.dto'
import { getErrorMessage } from 'src/common/helpers/error.helper'
import * as argon2 from 'argon2'
import { type PresentationLetter } from '../domain/entities/presentation-letter'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async findAll (): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findByEmail (email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email }
    })

    if (user === null) {
      throw new NotFoundException('El correo no existe')
    }

    return user
  }

  async getOneByEmail (email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email }
    })
  }

  async findOne (id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id
      }
    })

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async create (userDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: userDto.email }
    })

    if (existingUser !== null) {
      throw new NotFoundException('User already exists')
    }

    const user = this.usersRepository.create(userDto)

    try {
      return await this.usersRepository.save(user)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async update (id: number, userDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    })

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    const userUpdated = this.usersRepository.merge(user, userDto)

    try {
      return await this.usersRepository.save(userUpdated)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async changePassword (id: number, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    })

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    const hashedPassword = await argon2.hash(password)
    user.password = hashedPassword

    try {
      return await this.usersRepository.save(user)
    } catch (error) {
      throw new InternalServerErrorException(`Hubo un error: ${getErrorMessage(error)}`)
    }
  }

  async remove (id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    })

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    try {
      return await this.usersRepository.remove(user)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async updatePresentationLetters (id: number, presentationLetters: PresentationLetter[]): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id }
    })

    if (user === null) {
      throw new NotFoundException('User not found')
    }

    user.presentationLetters = presentationLetters

    try {
      return await this.usersRepository.save(user)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
