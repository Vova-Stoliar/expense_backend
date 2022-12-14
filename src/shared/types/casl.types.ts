import type { InferSubjects, MongoAbility } from '@casl/ability/dist/types';
import type { User } from '@prisma/client';

interface CaslUser extends User {
    kind: 'User';
}

export type Subjects = InferSubjects<CaslUser>;
export type AppAbility = MongoAbility<[Action, Subjects]>;
export type PolicyHandler = (ability: AppAbility) => boolean;

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}
