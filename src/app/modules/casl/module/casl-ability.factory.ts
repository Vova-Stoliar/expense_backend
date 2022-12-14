import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import { ActionsFactory } from '~/app/modules/casl/classes/user-actions.class';
import type { Action, Subjects } from '~/shared/types';

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const builder = new AbilityBuilder<MongoAbility<[Action, Subjects]>>(createMongoAbility);

        const actions = new ActionsFactory().createActions({ isAdmin: user.isAdmin });

        actions.invoke(builder);

        return builder.build({
            detectSubjectType: (item) => item.kind,
        });
    }
}
