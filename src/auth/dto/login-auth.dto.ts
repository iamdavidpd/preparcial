import { IsString, IsEmail, MinLength } from "class-validator";

export class LoginAuthDTO {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'La contrasenia debe tener al menos 6 caracteres' })
    password: string;
}