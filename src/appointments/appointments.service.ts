import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsEntity } from './appointments.entity';
import { Repository } from 'typeorm';
import { CreateCitaDTO } from './create-cita.dto';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(AppointmentsEntity)
        private readonly appRepository: Repository<AppointmentsEntity>
    ){}

    async create(data: CreateCitaDTO): Promise<AppointmentsEntity> {
        const cita = this.appRepository.create({
            ...data,
        })
        return await this.appRepository.save(cita);
    }

    async findCita(id: string): Promise<AppointmentsEntity>{
        const cita = await this.appRepository.findOne({
            where: {id}
        });

        if (!cita)
            throw new BusinessLogicException("The appointment with the given id was not found", BusinessError.NOT_FOUND);

        return cita;
    }

    async findAll(): Promise<AppointmentsEntity[]>{
        return this.appRepository.find();
    }

    async findByPatient(id_user: string): Promise<AppointmentsEntity[]>{
        return await this.appRepository.find({
            where: { id_user }
        });
    }

    async findByPatientAndDoctor(id_user: string, id_doctor: string): Promise<AppointmentsEntity[]>{
        return await this.appRepository.find({
            where: {id_user, id_doctor}
        });
    }

    async updateCita(idCita: string, citaNueva: CreateCitaDTO){
        const nueva = this.appRepository.update(idCita, citaNueva);
    }

    async deleteCita(id: string){
        return await this.appRepository.delete(id);
    }
}
