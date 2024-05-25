import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Application } from '../domain/entities/application.entity'
import { type UpdateApplicationDto, type CreateApplicationDto } from '../domain/dto/application.dto'
import { getErrorMessage } from 'src/common/helpers/error.helper'
import { UsersService } from 'src/users/users.service'
import { Offer } from '../domain/entities/offer.entity'
import { ApplicationEmailEmitter } from '../emitter/application.email.emitter'

@Injectable()
export class ApplicationsService {
  constructor (
    @InjectRepository(Application) private readonly applicationRepository: Repository<Application>,
    @InjectRepository(Offer) private readonly offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
    private readonly applicationEmailEmitter: ApplicationEmailEmitter
  ) {}

  async findAll (userId: number): Promise<Application[]> {
    return await this.applicationRepository.find({
      where: {
        user: {
          id: userId === 0 ? undefined : userId
        }
      }
    })
  }

  async getOne (id: number): Promise<Application | null> {
    return await this.applicationRepository.findOne({
      where: { id }
    })
  }

  async findOne (id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    return application
  }

  async create (userId: number, offerId: number, applicationDto: CreateApplicationDto): Promise<Application> {
    const user = await this.usersService.findOne(userId)
    const offer = await this.offerRepository.findOne({
      where: {
        id: offerId
      }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const application = this.applicationRepository.create({
      ...applicationDto,
      user,
      offer,
      applicationDate: new Date().toISOString()
    })

    try {
      if (user.emailNotification) await this.applicationEmailEmitter.emitApplicationApplyEmail({ user, offer })
      return await this.applicationRepository.save(application)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async update (id: number, applicationDto: UpdateApplicationDto): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    const applicationUpdated = this.applicationRepository.merge(application, applicationDto)

    try {
      return await this.applicationRepository.save(applicationUpdated)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async updateMany (applications: Application[]): Promise<Application[]> {
    try {
      await Promise.all(applications.map(async (application) => {
        const app = await this.applicationRepository.findOne({
          where: { id: application.id },
          relations: ['user', 'offer']
        })

        if (app === null) return

        const { user, offer } = app

        if (!user.emailNotification) return

        await this.applicationEmailEmitter.emitApplicationChangeStatusEmail({ user, offer, status: application.status })
      }))
      return await this.applicationRepository.save(applications)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async remove (id: number): Promise<Application> {
    const application = await this.applicationRepository.findOne({
      where: { id }
    })

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    try {
      return await this.applicationRepository.remove(application)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
