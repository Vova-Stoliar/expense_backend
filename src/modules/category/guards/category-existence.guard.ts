import type { CanActivate, ExecutionContext } from '@nestjs/common';

export class CategoryExistenceGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return true;
    }
}
