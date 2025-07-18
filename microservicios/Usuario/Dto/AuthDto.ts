import { IsEmail, IsString, MinLength } from 'class-validator';
export class AuthDto {

  @IsEmail()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
