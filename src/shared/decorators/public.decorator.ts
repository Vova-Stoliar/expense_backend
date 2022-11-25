import { SetMetadata } from '@nestjs/common';
import { PUBLIC_DECORATOR_KEYWORD } from '~/shared/constants';

export const Public = () => SetMetadata(PUBLIC_DECORATOR_KEYWORD, true);
