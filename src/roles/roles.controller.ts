import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './create-role.dto';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ){}

    @Post()
    @Roles('admin')
    async create(@Body() createRoleDto: CreateRoleDto) {
        const role = await this.rolesService.create(createRoleDto);
        return {
        message: 'Rol creado con éxito',
        roleId: role.id,
        };
    }

    @Get()
    @Roles('admin')
    async findAll() {
        const roles = await this.rolesService.findAll();
        return roles.map((r) => ({
            id: r.id,
            role_name: r.role_name,
            description: r.description
        }));
    }
}
