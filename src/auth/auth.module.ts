import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStrategy } from './strategies/jwt.strategy'
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const SECRET_KEY = configService.get<string>('jwt.secret', '')
        const EXPIRES_IN = configService.get<string>('jwt.expiresIn', '')

        return {
          secret: SECRET_KEY,
          signOptions: {
            expiresIn: EXPIRES_IN
          }
        }
      },
      inject: [ConfigService]
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
  exports: [AuthService]
})
export class AuthModule {}
