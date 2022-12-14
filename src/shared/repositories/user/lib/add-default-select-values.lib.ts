import type { Prisma } from '@prisma/client';
import type { BaseUser } from '~/shared/types';

type UserSelect = Prisma.UserSelect;

export function addDefaultSelectValues({ select }: { select: UserSelect | null | undefined }) {
    const DEFAULT_SELECT_VALUES: Record<keyof BaseUser, boolean> = {
        id: true,
        email: true,
        userName: true,
        displayName: true,
    };

    return Object.assign(DEFAULT_SELECT_VALUES, select);
}
