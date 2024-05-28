import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AdditionalFile } from '../domain/entities/additional-file.entity'
import { type AdditionalFileDto } from '../domain/dto/additional-file.dto'
import { type User } from '../domain/entities/user.entity'
import { UsersService } from './users.service'
import { getErrorMessage } from 'src/common/helpers/error.helper'

@Injectable()
export class AdditionalFilesService {
  constructor (
    @InjectRepository(AdditionalFile) private readonly additionalFileRepository: Repository<AdditionalFile>,
    private readonly usersService: UsersService
  ) {}

  async create (currentUser: User, additionalFileDto: AdditionalFileDto): Promise<AdditionalFile> {
    const user = await this.usersService.findOne(currentUser.id)

    const additionalFile = this.additionalFileRepository.create({
      ...additionalFileDto,
      user
    })

    try {
      return await this.additionalFileRepository.save(additionalFile)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async remove (id: number): Promise<AdditionalFile> {
    const additionalFile = await this.additionalFileRepository.findOne({
      where: { id }
    })

    if (additionalFile === null) {
      throw new NotFoundException('Additional file not found')
    }

    try {
      return await this.additionalFileRepository.remove(additionalFile)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
