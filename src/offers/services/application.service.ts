import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MongoRepository } from 'typeorm'
import { Application } from '../domain/entities/application.entity'
import { ObjectId } from 'mongodb'
import { type UpdateApplicationDto, type CreateApplicationDto } from '../domain/dto/application.dto'
import { getErrorMessage } from 'src/common/helpers/error.helper'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class ApplicationsServices {
  constructor (
    @InjectRepository(Application) private readonly applicationRepository: MongoRepository<Application>,
    private readonly usersService: UsersService
  ) {}

  async findAll (): Promise<Application[]> {
    return await this.applicationRepository.find()
  }

  async getOne (id: string): Promise<Application | null> {
    return await this.applicationRepository.findOne({
      where: { _id: new ObjectId(id) }
    })
  }

  async findOne (id: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    return application
  }

  async create (userId: string, applicationDto: CreateApplicationDto): Promise<Application> {
    const user = await this.usersService.findOne(userId)

    const application = this.applicationRepository.create(applicationDto)
    application.user = user
    application.applicationDate = new Date().toISOString()

    try {
      return await this.applicationRepository.save(application)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async update (id: string, applicationDto: UpdateApplicationDto): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    try {
      await this.applicationRepository.update(id, applicationDto)
      return await this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async remove (id: string): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    try {
      await this.applicationRepository.delete(id)
      return application
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
