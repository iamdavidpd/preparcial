import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean {
    const requiredRoles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    const userRoles: string[] = (user.roles ?? []).map(
      (r: any) => r.role_name ?? r,
    );

    const hasRole = requiredRoles.some((role) =>
      userRoles.includes(role),
    );

    return hasRole;
  }
}