import { Body, ClassSerializerInterceptor, Controller, Delete, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AdditionalFilesService } from '../services/additional-file.service'
import { AdditionalFileDto } from '../domain/dto/additional-file.dto'
import { type AdditionalFile } from '../domain/entities/additional-file.entity'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from '../domain/entities/user.entity'

@ApiBearerAuth()
@ApiTags('additional-files')
@Controller('additional-files')
@UseInterceptors(ClassSerializerInterceptor)
export class AdditionalFilesController {
  constructor (
    private readonly additionalFilesService: AdditionalFilesService
  ) {}

  @Post()
  async create (
    @CurrentUser() user: User,
      @Body() additionalFileDto: AdditionalFileDto
  ): Promise<AdditionalFile> {
    return await this.additionalFilesService.create(user, additionalFileDto)
  }

  @Delete(':id')
  async remove (@Param('id', ParseIntPipe) id: number): Promise<AdditionalFile> {
    return await this.additionalFilesService.remove(id)
  }
}
