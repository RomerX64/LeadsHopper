import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, Length, MinLength } from "class-validator";

export class RegisterUserDto {
  @ApiProperty({ example: "owner@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Romer" })
  @IsString()
  @Length(2, 80)
  displayName!: string;

  @ApiProperty({ minLength: 8, example: "LeadHopper!2025" })
  @IsStrongPassword({ minLength: 8 })
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: "owner@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: "owner@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "Romer X64" })
  @IsString()
  @Length(2, 80)
  displayName!: string;
}

export class ChangePasswordDto {
  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  currentPassword!: string;

  @ApiProperty({ minLength: 8 })
  @IsStrongPassword({ minLength: 8 })
  newPassword!: string;
}
