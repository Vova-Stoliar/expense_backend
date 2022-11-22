import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';
// implements Prisma.UserDelegate<undefined>

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    async create<T extends Prisma.UserCreateArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
    ): Promise<Prisma.UserGetPayload<T, keyof T>> {
        // TODO create default return args
        return this.prismaService.user.create(args);
    }
}
