import type { AuthService } from '~/modules/auth/module/auth-service';
import { generateCategory, generateUser } from '~/shared/constants/test';
import type { Category } from '~/shared/types';

export const getUserToSignup = () => {
    const { email, userName, displayName, password } = generateUser();

    return {
        email,
        userName,
        displayName,
        password,
        confirmPassword: password,
    };
};

export const getCategoryToCrate = (category: Partial<Category> = {}) => {
    const { name, notes, amount } = generateCategory({ name: 'Sport', ...category });

    return { name, notes, amount };
};
