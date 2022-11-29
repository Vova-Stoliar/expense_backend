import { SetMetadata } from '@nestjs/common';
import { DECORATORS_KEYS } from '~/shared/constants';
import type { PolicyHandler } from '~/shared/types';

export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata(DECORATORS_KEYS.checkPolicies, handlers);
