import { Injectable } from '@nestjs/common';
import type { Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from '~/shared/modules/prisma';
import type { BaseUser } from '~/shared/types';

type UserSelect = Prisma.UserSelect;

// implements Prisma.UserDelegate<undefined>

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService) {}

    private getSelectValues({ select }: { select: UserSelect | null | undefined }) {
        const customSelectValues: Record<keyof BaseUser, boolean> = {
            id: true,
            email: true,
            userName: true,
            displayName: true,
        };

        return Object.assign(customSelectValues, select);
    }

    async create<T extends Prisma.UserCreateArgs>(args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>) {
        const { select, data } = args;

        return this.prismaService.user.create({
            data,
            select: this.getSelectValues({ select }),
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
            select: this.getSelectValues({ select }),
        });
    }

    findFirstOrThrow<T extends Prisma.UserFindFirstOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindFirstOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.user.findFirstOrThrow({
            ...args,
            select: this.getSelectValues({ select }),
        });
    }

    findUniqueOrThrow<T extends Prisma.UserFindUniqueOrThrowArgs>(
        args: Prisma.SelectSubset<T, Prisma.UserFindUniqueOrThrowArgs>
    ) {
        const { select } = args;

        return this.prismaService.user.findUniqueOrThrow({
            ...args,
            select: this.getSelectValues({ select }),
        });
    }
}
