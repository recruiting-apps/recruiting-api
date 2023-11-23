import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Status } from '../enum/status.enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateApplicationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Status)
    status: Status

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    comments: string
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
