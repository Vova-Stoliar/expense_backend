import type { Prisma } from '@prisma/client';
import type { BaseUser } from '~/shared/types';

type UserSelect = Prisma.UserSelect;

export function addDefaultSelectValues({ select }: { select: UserSelect | null | undefined }) {
    const defaultSelectValues: Record<keyof BaseUser, boolean> = {
        id: true,
        email: true,
        userName: true,
        displayName: true,
    };

    return Object.assign(defaultSelectValues, select);
}
