import type { AbilityBuilder, MongoAbility } from '@casl/ability';
import type { User } from '@prisma/client';
import type { Action, Subjects } from '~/shared/types';

export interface IActionsFactory {
    createActions(isAdmin: Pick<User, 'isAdmin'>): Actions;
}

export interface Actions {
    invoke(builder: AbilityBuilder<MongoAbility<[Action, Subjects]>>): void;
}
