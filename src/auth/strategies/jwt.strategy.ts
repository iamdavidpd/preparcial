import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BusinessError, BusinessLogicException } from "src/shared/errors/business-errors";
import { UsersService } from "src/users/users.service";


export interface JwtPayload {
    id: string;
    email: string,
    roles: string[],
    is_active: boolean
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private readonly usersService: UsersService,
        configService: ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET') ?? '',
        });
    }

    async validate(payload: JwtPayload){
        const user = await this.usersService.findById(payload.id);

        if (!user || !user.is_active){
            throw new BusinessLogicException('Usuario no autorizado', BusinessError.UNAUTHORIZED)
        }


        return {
            id: user.id,
            email: user.email,
            roles: user.roles,
            is_active: user.is_active
        };
    }
}