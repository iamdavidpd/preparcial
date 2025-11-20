import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateCitaDTO } from './create-cita.dto';

@Controller('cita')
export class AppointmentsController {
    constructor(
        private readonly appSer: AppointmentsService
    ){}

    @Post('crear')
    @HttpCode(HttpStatus.OK)
    async crearCita(@Body() createCitaDTO: CreateCitaDTO){
        return this.appSer.create(createCitaDTO);
    }

    @Get('lista')
    @HttpCode(HttpStatus.OK)
    async lista(){
        return this.appSer.findAll();
    }


    @Post('update')
    @HttpCode(HttpStatus.ACCEPTED)
    async update(id: string, @Body() dto: CreateCitaDTO){
        return this.appSer.updateCita(id, dto);
    }
}
