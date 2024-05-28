import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from './domain/entities/notification.entity'
import { type NotificationDto } from './domain/dto/notification.dto'
import { UsersService } from 'src/users/services/users.service'
import { getErrorMessage } from 'src/common/helpers/error.helper'

@Injectable()
export class NotificationsService {
  constructor (
    @InjectRepository(Notification) private readonly notificationRepository: Repository<Notification>,
    private readonly usersService: UsersService
  ) {}

  async findByUser (userId: number): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    })
  }

  async create (notificationDto: NotificationDto): Promise<Notification> {
    const user = await this.usersService.findOne(notificationDto.userId)

    const notification = this.notificationRepository.create({
      ...notificationDto,
      user
    })

    try {
      return await this.notificationRepository.save(notification)
    } catch (error) {
      throw new InternalServerErrorException(getErrorMessage(error))
    }
  }
}
