import { ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Status } from '../enum/status.enum'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateApplicationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(Status)
    status: Status

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
    comments: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
    letter?: string
}

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {}
