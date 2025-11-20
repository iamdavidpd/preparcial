import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import * as bcrypt from 'bcryptjs';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly rolesService: RolesService,
        private readonly jwtService: JwtService
    ){}

    async register(registerDTO: RegisterAuthDTO){
        const { email, password, name, phone } = registerDTO;

        const existing = await this.usersService.findByEmailOrNull(email);
        if (existing){
            throw new BusinessLogicException('Email ya registrado', BusinessError.CONFLICT);
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            email, password:hashedPass, name, phone
        });

        return {
            message: 'Usuario registrado con exito',
            userId: user.id
        }
    }

    async validateUser(email: string, passwordP: string){
        const user = await this.usersService.findByEmail(email);

        if(!user){
            throw new BusinessLogicException('Credenciales incorrectas', BusinessError.UNAUTHORIZED);
        }

        const isMatch = await bcrypt.compare(passwordP, user.password);
        if(!isMatch){
            throw new BusinessLogicException('Credenciales incorrectas', BusinessError.UNAUTHORIZED);
        }

        return user;
    }

    async login(email: string, passwordP: string){
        const user = await this.validateUser(email, passwordP);

        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles.map(r => r.role_name)
        };

        const access_token = await this.jwtService.signAsync(payload);

        return { access_token };
    }
}
