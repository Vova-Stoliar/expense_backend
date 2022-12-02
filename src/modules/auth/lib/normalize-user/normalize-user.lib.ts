import type { BaseUser } from '~/shared/types';

export const normalizeUser = (user: BaseUser): BaseUser => {
    const { id, email, userName, displayName } = user;

    return { id, email, userName, displayName };
};
