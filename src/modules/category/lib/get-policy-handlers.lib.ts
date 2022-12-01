import { Action, AppAbility, PolicyHandler } from '~/shared/types';

const createDefaultCategories: PolicyHandler = (ability: AppAbility) => ability.can(Action.Manage, 'User');

export const getPolicyHandlers = () => {
    return { createDefaultCategories };
};
