export class UserDto {
  id_us?: string;
  nombre: string;
  apellido: string;
  email: string;
  fecha_nacimiento: Date;
  red_social_login?: string;
  password?: string;

  constructor(
    nombre: string,
    apellido: string,
    email: string,
    fecha_nacimiento: Date,
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
