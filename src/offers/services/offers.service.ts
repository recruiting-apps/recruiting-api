import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getErrorMessage } from 'src/common/helpers/error.helper'
import { MongoRepository } from 'typeorm'
import { Offer } from '../domain/entities/offer.entity'
import { type UpdateOfferDto, type CreateOfferDto } from '../domain/dto/offer.dto'
import { ObjectId } from 'mongodb'
import { UsersService } from 'src/users/users.service'
import { ApplicationsServices } from './application.service'
import { Status } from '../domain/enum/status.enum'
import { type Application } from '../domain/entities/application.entity'

@Injectable()
export class OffersService {
  constructor (
    @InjectRepository(Offer) private readonly offersRepository: MongoRepository<Offer>,
    private readonly applicationsService: ApplicationsServices,
    private readonly usersService: UsersService
  ) { }

  async findAll (userId: string): Promise<Offer[]> {
    const offers = await this.offersRepository.find({
      relations: ['user']
    })

    if (userId === '') return offers

    return offers.filter((offer) => offer.user._id.toString() === userId)
  }

  async findMyApplications (userId: string): Promise<Offer[]> {
    const offers = await this.offersRepository.find({
      relations: ['user', 'applications']
    })

    return offers.filter((offer) => {
      return offer.applications.some((item) => item.user._id.toString() === userId)
    })
  }

  async findOne (id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    return offer
  }

  async create (userId: string, offerDto: CreateOfferDto): Promise<Offer> {
    const user = await this.usersService.findOne(userId)
    const offer = this.offersRepository.create(offerDto)

    offer.user = user
    offer.applications = []

    try {
      return await this.offersRepository.save(offer)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async update (id: string, offerDto: UpdateOfferDto): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    try {
      await this.offersRepository.update(id, offerDto)
      return await this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async remove (id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    try {
      await this.offersRepository.delete(id)
      return offer
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  findApplication (offer: Offer, userId: string, throwException: boolean): boolean {
    const exists = offer.applications.some((item) => item.user._id.toString() === userId)

    if (exists && throwException) {
      throw new BadRequestException('You already applied to this offer')
    }

    return exists
  }

  async apply (id: string, userId: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) },
      relations: {
        applications: true
      }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    this.findApplication(offer, userId, true)

    const user = await this.usersService.findOne(userId)

    const application = await this.applicationsService.create(user.id, {
      comments: '',
      status: Status.PENDING
    })

    offer.applications.push(application)

    try {
      await this.offersRepository.update(id, offer)
      return await this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async cancelApplication (id: string, applicationId: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const exists = offer.applications.some((item) => item._id.toString() === applicationId)

    if (!exists) {
      return offer
    }

    const application = await this.applicationsService.findOne(applicationId)

    offer.applications = offer.applications.filter((item) =>
      item._id.toString() !== application._id.toString()
    )

    try {
      await this.applicationsService.remove(applicationId)
      await this.offersRepository.update(id, offer)
      return await this.findOne(id)
    } catch (error) {
      const applicationToRemove = await this.applicationsService.getOne(applicationId)
      if (applicationToRemove) {
        await this.applicationsService.remove(applicationId)
      }
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async updateApplication (id: string, applicationId: string, status: Status): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    const application = await this.applicationsService.findOne(applicationId)

    application.status = status

    try {
      await this.applicationsService.update(applicationId, application)
      return await this.offersRepository.save(offer)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }

  async getApplications (id: string): Promise<Application[]> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    return offer.applications
  }

  async getBetterApplication (id: string): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { _id: new ObjectId(id) }
    })

    if (offer === null) {
      throw new NotFoundException('Offer not found')
    }

    // TODO: Connection with AI API to get the best application
    const random = Math.floor(Math.random() * offer.applications.length)

    const application = offer.applications.find((item, index) => index === random)

    if (!application) {
      throw new NotFoundException('Application not found')
    }

    application.status = Status.ACCEPTED
    const otherApplications = offer.applications
      .filter((item) => item.id !== application.id)
      .map((item) => {
        item.status = Status.REJECTED
        return item
      })

    offer.applications = [application, ...otherApplications]

    try {
      await this.applicationsService.update(application.id, application)
      await this.offersRepository.update(id, offer)
      return await this.findOne(id)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
