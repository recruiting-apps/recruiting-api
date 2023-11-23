import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    description: 'Email to login with'
  })
  @IsString()
  @IsNotEmpty()
    email: string

  @ApiProperty({
    description: 'user password'
  })
  @IsString()
  @IsNotEmpty()
    password: string
}
