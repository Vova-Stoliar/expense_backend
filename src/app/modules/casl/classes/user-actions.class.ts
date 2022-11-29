import type { User } from '@prisma/client';
import { UserActions } from '~/app/modules/casl/classes/actions.factory';
import { AdminActions } from '~/app/modules/casl/classes/admin-actions.class';
import type { Actions, IActionsFactory } from '~/app/modules/casl/types';

export class ActionsFactory implements IActionsFactory {
    createActions(params: Pick<User, 'isAdmin'>): Actions {
        const { isAdmin } = params;

        if (isAdmin) return new AdminActions();

        return new UserActions();
    }
}
