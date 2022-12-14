import { expect } from '@jest/globals';
import { toBeUUID } from './to-be-uuid.jest';

expect.extend({
    toBeUUID,
});
