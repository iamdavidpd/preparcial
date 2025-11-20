import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './roles.entity';
import { Repository, In } from 'typeorm';

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
}
