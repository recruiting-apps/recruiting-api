import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class ChangePasswordDto {
  @ApiProperty({
    description: 'user password'
  })
  @IsString()
  @IsNotEmpty()
    password: string
}
