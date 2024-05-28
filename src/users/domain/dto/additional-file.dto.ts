import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class AdditionalFileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    path: string
}
