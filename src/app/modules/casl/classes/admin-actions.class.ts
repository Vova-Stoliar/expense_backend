import type { AbilityBuilder, MongoAbility } from '@casl/ability';
import type { Actions } from '~/app/modules/casl/types';
import { Action, Subjects } from '~/shared/types';

export class AdminActions implements Actions {
    invoke(builder: AbilityBuilder<MongoAbility<[Action, Subjects]>>) {
        const { can } = builder;

        can(Action.Manage, 'User');
    }
}
