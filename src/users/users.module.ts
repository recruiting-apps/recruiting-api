import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { UsersController } from './controllers/users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './domain/entities/user.entity'
import { AdditionalFile } from './domain/entities/additional-file.entity'
import { AdditionalFilesService } from './services/additional-file.service'
import { AdditionalFilesController } from './controllers/additional-files.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      AdditionalFile
    ])
  ],
  providers: [UsersService, AdditionalFilesService],
  controllers: [UsersController, AdditionalFilesController],
  exports: [UsersService]
})
export class UsersModule {}
