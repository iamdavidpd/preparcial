import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository, In } from 'typeorm';
import { CreateRoleDto } from './create-role.dto';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ){};

    async findByNames(roleNames: string[]): Promise<RolesEntity[]> {
        return await this.rolesRepository.find({
            where: { role_name: In(roleNames) }
        });
    };

    async create(dto: CreateRoleDto): Promise<RolesEntity>{
        const { role_name, description } = dto;

        const existing = await this.rolesRepository.findOne({
            where: { role_name },
        });
        if (existing) {
            throw new BusinessLogicException('role_name ya existe',
            BusinessError.PRECONDITION_FAILED,
            );
        }

        const role = this.rolesRepository.create({ role_name, description });
        return this.rolesRepository.save(role);
    }

    async findAll(): Promise<RolesEntity[]>{
        return this.rolesRepository.find();
    }
}
