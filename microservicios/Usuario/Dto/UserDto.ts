  import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
  export class UserDto {
    
    @IsOptional()
    id_us?: string;

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsOptional()
    nombre?: string;

    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @IsOptional()
    apellido?: string;

    @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
    email: string;

    @IsOptional()
    fecha_nacimiento?: Date;

    @IsOptional()
    red_social_login?: string;

    @IsOptional()
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password?: string;

    constructor(
      email: string,
      nombre?: string,
      apellido?: string,
      fecha_nacimiento?: Date,
      red_social_login?: string,
      password?: string
    ) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.fecha_nacimiento = fecha_nacimiento;
      this.red_social_login = red_social_login;
      this.password = password;
    }
  }
