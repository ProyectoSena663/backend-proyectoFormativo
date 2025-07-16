import { IsEmail, IsString } from 'class-validator';
export class AuthDto {

  @IsEmail()
  @IsString({ message: 'El email debe ser una cadena de texto' })
  email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
