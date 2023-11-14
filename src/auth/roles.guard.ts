import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/entity/enum/user_role.enum';


@Injectable()
export class RolesGuard  implements CanActivate{
    constructor(private reflector: Reflector){}
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // No roles defined, allow access
    }

    // const request = context.switchToHttp().getRequest();
    const user = {
      email:"akkgit0909@gmail.com",
      roles:UserRole.USER

    }
    return roles.some((role)=> role === user.roles)
    }
}