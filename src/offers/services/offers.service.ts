import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getErrorMessage } from 'src/common/helpers/error.helper'
import { Repository } from 'typeorm'
import { Offer } from '../domain/entities/offer.entity'
import { type UpdateOfferDto, type CreateOfferDto } from '../domain/dto/offer.dto'
import { UsersService } from 'src/users/users.service'
import { ApplicationsService } from './application.service'
import { Status } from '../domain/enum/status.enum'
import { AiService } from 'src/ai/ai.service'

@Injectable()
export class OffersService {
  constructor (
    @InjectRepository(Offer) private readonly offersRepository: Repository<Offer>,
    private readonly applicationsService: ApplicationsService,
    private readonly usersService: UsersService,
    private readonly aiService: AiService
  ) { }

  async findAll (userId: number): Promise<Offer[]> {
    return await this.offersRepository.find({
      where: {
        user: {
          id: userId === 0 ? undefined : userId
        }
      },
      relations: {
        user: true,
        applications: {
          user: true
        }
      }
    })
  }

  async findOne (id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: {
        user: true,
        applications: {
          user: true
        }
      }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    return offer
  }

  async create (userId: number, offerDto: CreateOfferDto): Promise<Offer> {
    const user = await this.usersService.findOne(userId)
    const offer = this.offersRepository.create({
      ...offerDto,
      user,
      applications: []
    })

    try {
      return await this.offersRepository.save(offer)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async update (id: number, offerDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const offerUpdated = this.offersRepository.merge(offer, offerDto)

    try {
      return await this.offersRepository.save(offerUpdated)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async remove (id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    try {
      return await this.offersRepository.remove(offer)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async apply (id: number, userId: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: {
        user: true,
        applications: {
          user: true
        }
      }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const { user, applications } = offer

    const doesUserAlreadyApplied = applications.some((item) => item.user.id === userId)

    if (doesUserAlreadyApplied) {
      throw new BadRequestException('You already applied to this offer')
    }

    if (user.cvPath === '' || user.cvPath === null) {
      throw new BadRequestException('You need to upload your CV before applying to an offer')
    }

    const application = await this.applicationsService.create(userId, offer.id, {
      comments: '',
      status: Status.PENDING
    })

    offer.applications.push(application)

    try {
      return await this.offersRepository.save(offer)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async getBetterApplication (id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const application = await this.aiService.getBetterApplicantUsingAi(offer)
    // const application = offer.applications[Math.floor(Math.random() * offer.applications.length)]

    if (application === null) {
      throw new NotFoundException('Application not found')
    }

    application.status = Status.ACCEPTED
    const otherApplications = offer.applications
      .filter((item) => item.id !== application.id)
      .map((item) => {
        item.status = Status.REJECTED
        return item
      })

    try {
      await this.applicationsService.updateMany([application, ...otherApplications])
      return await this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
