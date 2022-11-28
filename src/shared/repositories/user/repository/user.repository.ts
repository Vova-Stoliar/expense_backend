import { Injectable } from '@nestjs/common';
import type { Prisma, PrismaPromise } from '@prisma/client';
import { addDefaultSelectValues } from '~/shared/repositories/user/lib';
import { PrismaService } from '~/shared/modules/prisma';

// implements Prisma.UserDelegate<undefined>

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    async create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
        const { select } = args;

        return this.prismaService.user.create({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    updateMany<T extends Prisma.UserUpdateManyArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs>
    ): PrismaPromise<Prisma.BatchPayload> {
        return this.prismaService.user.updateMany(args);
    }

    update<T extends Prisma.UserUpdateArgs>(args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>) {
        const { select } = args;

        return this.prismaService.user.update({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    findUnique<T extends Prisma.UserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>) {
        const { select } = args;

        return this.prismaService.user.findUnique({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    findFirstOrThrow<T extends Prisma.UserFindFirstOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindFirstOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.user.findFirstOrThrow({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }

    findUniqueOrThrow<T extends Prisma.UserFindUniqueOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindUniqueOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.user.findUniqueOrThrow({
            ...args,
            select: addDefaultSelectValues({ select }),
        });
    }
}
