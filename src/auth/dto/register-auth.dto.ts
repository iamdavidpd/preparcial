import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class RegisterAuthDTO {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'La contrasenia debe tener al menos 6 caracteres' })
    password: string;

    @IsString()
    name: string;

    @IsOptional()
    phone?: string;
}