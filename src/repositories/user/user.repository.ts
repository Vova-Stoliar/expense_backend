import { Injectable } from '@nestjs/common';
import type { Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';

// implements Prisma.UserDelegate<undefined>

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    private customSelectValues = { id: true, email: true, userName: true, displayName: true };

    async create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
        const { select, data } = args;

        return this.prismaService.user.create({
            data,
            select: Object.assign(this.customSelectValues, select),
        });
    }

    updateMany<T extends Prisma.UserUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>
    ): PrismaPromise<Prisma.BatchPayload> {
        return this.prismaService.user.updateMany(args);
    }

    update<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>) {
        return this.prismaService.user.update(args);
    }

    findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>) {
        const { select } = args;

        return this.prismaService.user.findUnique({
            ...args,
            select: Object.assign(this.customSelectValues, select),
        });
    }
}
