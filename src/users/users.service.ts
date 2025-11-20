import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { RegisterAuthDTO } from 'src/auth/dto/register-auth.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ){}

    async findById(id: string): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: {id}, relations: ["roles"] });
        if (!user)
            throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);

        return user;
    }

    async create(data: RegisterAuthDTO): Promise<UsersEntity> {
        const user = this.usersRepository.create({
            ...data,
            is_active: true
        })
        return user
    }

    async findByEmail(email: string): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: {email}, relations: ["roles"] });
        if (!user)
            throw new BusinessLogicException("The user with the given email was not found", BusinessError.NOT_FOUND);

        return user;
    }
}
