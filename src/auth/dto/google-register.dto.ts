import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsEmail, IsOptional, IsString, ValidateNested } from 'class-validator'
import { CreateUserDto } from 'src/users/domain/dto/user.dto'

export class GoogleRegisterDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
    email: string

  @ApiPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDto)
    user?: CreateUserDto
}
