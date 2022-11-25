import type { Prisma } from '@prisma/client';
import type { BaseUser } from '~/shared/types';

type UserSelect = Prisma.UserSelect;

export function getSelectValues({ select }: { select: UserSelect | null | undefined }) {
    const customSelectValues: Record<keyof BaseUser, boolean> = {
        id: true,
        email: true,
        userName: true,
        displayName: true,
    };

    return Object.assign(customSelectValues, select);
}
