import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from 'src/common/decorators/public.decorator'
import { type User } from 'src/users/domain/entities/user.entity'
import { AuthService } from './auth.service'
import { ChangePasswordDto } from './dto/change-password.dto'
import { LoginDto } from './dto/login.dto'
import { type LoginResponse } from './responses/login-response'
import { CreateUserDto } from 'src/users/domain/dto/user.dto'
import { GoogleRegisterDto } from './dto/google-register.dto'

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
  @Post('google')
  @ApiOperation({
    summary: 'Register a new user with Google'
  })
  async registerWithGoogle (@Body() googleRegister: GoogleRegisterDto): Promise<LoginResponse> {
    return await this.authService.registerWithGoogle(googleRegister)
  }

  @Public()
  @Patch(':id/change-password')
  @ApiOperation({
    summary: 'Register a new user'
  })
  async changePassword (
    @Param('id', ParseIntPipe) id: number,
      @Body() changePasswordDto: ChangePasswordDto
  ): Promise<User> {
    return await this.authService.changePassword(id, changePasswordDto)
  }
}
