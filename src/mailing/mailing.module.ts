import { Module } from '@nestjs/common'
import { MailingService } from './mailing.service'
import { UsersModule } from 'src/users/users.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { MailingListener } from './mailing.listener'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'recruitingapp2024@gmail.com',
          pass: 'jqbiulpvxbzdukwt'
        },
        tls: {
          rejectUnauthorized: false
        }
      }
    }),
    UsersModule
  ],
  providers: [MailingService, MailingListener]
})
export class MailingModule {}
