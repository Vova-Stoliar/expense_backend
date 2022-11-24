import type { User } from '@prisma/client';

export * from './utility-types';

export type BaseUser = Pick<User, 'email' | 'userName' | 'displayName' | 'id'>;
