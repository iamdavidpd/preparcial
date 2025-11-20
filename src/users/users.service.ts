import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';

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

    async create(user: UsersEntity): Promise<UsersEntity> {
        return await this.usersRepository.save(user);
    }

    async findByEmail(email: string): Promise<UsersEntity> {
        const user = await this.usersRepository.findOne({ where: {email}, relations: ["roles"] });
        if (!user)
            throw new BusinessLogicException("The user with the given email was not found", BusinessError.NOT_FOUND);

        return user;
    }
}
