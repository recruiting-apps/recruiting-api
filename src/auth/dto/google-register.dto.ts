import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class GoogleRegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
    email: string
}
