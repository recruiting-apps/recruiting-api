import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { type User } from './domain/entities/user.entity'
import { CreateUserDto, UpdateUserDto } from './domain/dto/user.dto'
import { Public } from 'src/common/decorators/public.decorator'

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor (
    private readonly usersService: UsersService
  ) {}

  @Get()
  async findAll (): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Post()
  async create (@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Public()
  @Get('email')
  async findByEmail (@Query('email') email: string): Promise<User | null> {
    return await this.usersService.getOneByEmail(email)
  }

  @Get(':id')
  async findOne (@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @Patch(':id')
  async update (
    @Param('id', ParseIntPipe) id: number,
      @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async remove (@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.remove(id)
  }
}
