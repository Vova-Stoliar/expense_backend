import type { Prisma, Token } from '@prisma/client';
import type { BaseUser } from '~/shared/types';

type UserSelect = Prisma.UserSelect;

export function addDefaultSelectValues({ select }: { select: UserSelect | null | undefined }) {
    const defaultSelectValues: Record<keyof Pick<Token, 'userId'>, boolean> = {
        userId: true,
    };

    return Object.assign(defaultSelectValues, select);
}
