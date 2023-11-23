import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger'
import { IsNotEmpty, Validate, IsString, IsArray, IsOptional } from 'class-validator'
import { IsStringOrNumber } from 'src/common/validator/string-or-number.validator'

export class CreateOfferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    description: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    company: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    location: string

  @ApiProperty()
  @Validate(IsStringOrNumber)
    salary: string | number

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    publicationDate: Date

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    expirationDate: Date

  @ApiProperty()
  @IsArray()
    expectedAbilities: string[]

  @ApiPropertyOptional()
  @IsOptional()
    closed: boolean
}

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
