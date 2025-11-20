import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
    @Get()
    @Roles('admin')
    findAll(){
        return 'Solo admins';
    }
}
