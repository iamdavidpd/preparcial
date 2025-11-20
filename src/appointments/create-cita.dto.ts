import { IsDate, IsDateString, IsMilitaryTime, IsNotEmpty, IsString } from "class-validator";


export class CreateCitaDTO {
    @IsString()
    @IsNotEmpty()
    id_doctor: string;

    @IsDate()
    @IsNotEmpty()
    fecha: Date

    @IsNotEmpty()
    hora: string;

    @IsString()
    @IsNotEmpty()
    motivo: string;
}