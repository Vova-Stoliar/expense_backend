import type { UserToSignupDto } from '~/modules/auth/dto';
import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';
import { generateUser } from '~/shared/constants/test';

export const getUserToSignup = (user: Partial<UserToSignupDto> = {}): UserToSignupDto => {
    const { email, userName, displayName, password } = generateUser();

    return { email, userName, displayName, password, confirmPassword: password, ...user };
};

export const getTransactionToCreate = () => {
    const { amount, notes } = generateCategoryTransaction();

    return { amount, notes };
};
