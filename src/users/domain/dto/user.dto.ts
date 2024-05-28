import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'
import { type PresentationLetterDto } from './presentation-letter.dto'
import { Role } from '../enums/role.enum'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
    name: string

  @ApiProperty()
  @IsString()
    lastName: string

  @ApiProperty()
  @IsString()
    email: string

  @ApiProperty()
  @IsString()
    password: string

  @ApiProperty()
  @IsEnum(Role)
    role: Role

  @ApiProperty()
  @IsDateString()
    bornDate: Date

  @ApiProperty()
  @IsString()
    description: string

  @ApiProperty()
  @IsString()
    phone: string

  @ApiProperty()
  @IsString()
    profession: string

  @ApiProperty()
  @IsString()
    address: string

  @ApiProperty()
  @IsString()
    education: string

  @ApiProperty()
  @IsString()
    workExperience: string

  @ApiProperty()
  @IsArray()
  @Type(() => String)
    abilities: string[]

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    cvPath: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    profileImagePath: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
    googleAccount: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
    emailNotification: boolean

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
    presentationLetters: PresentationLetterDto[]
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
