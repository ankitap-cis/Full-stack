import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log("🚀 ~ RolesGuard ~ canActivate ~ user:", user)
    
    if (!user || !user.id) {
      throw new UnauthorizedException('User not found in request');
    }

    const userEntity = await this.userService.findOne(user.id);
    if (!userEntity) {
      throw new UnauthorizedException('User not found');
    }

    return requiredRoles.some((role) => userEntity.roles);
  }
}
