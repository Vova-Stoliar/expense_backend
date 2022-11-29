import { SetMetadata } from '@nestjs/common';
import { DECORATORS_KEYS } from '~/shared/constants';

export const Public = () => SetMetadata(DECORATORS_KEYS.public, true);
