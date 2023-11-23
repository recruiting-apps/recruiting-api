import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { Public } from 'src/common/decorators/public.decorator'
import { User } from 'src/users/domain/entities/user.entity'
import { AuthService } from './auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { type LoginResponse } from './responses/login-response'
import { CreateUserDto } from 'src/users/domain/dto/user.dto'

@ApiTags('authentication_authorization')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({
    summary: 'Create a new session'
  })
  async login (@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return await this.authService.login(loginDto)
  }

  @Public()
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user'
  })
  async register (@Body() registerDto: CreateUserDto): Promise<User> {
    return await this.authService.register(registerDto)
  }

  @Public()
  @Patch(':id/change-password')
  @ApiOperation({
    summary: 'Register a new user'
  })
  async changePassword (
    @Param('id') id: string,
      @Body() changePasswordDto: ChangePasswordDto
  ): Promise<User> {
    return await this.authService.changePassword(id, changePasswordDto)
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get the current authenticated user'
  })
  async user (@CurrentUser() user: User): Promise<LoginResponse> {
    return await this.authService.getCurrentUser(user)
  }
}
