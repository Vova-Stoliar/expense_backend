import { generateTokens } from '~/modules/auth/constants/test';
import { generateUser } from '~/shared/constants/test';

export const getSwaggerSchemaExample = () => {
    const { id, email, userName, displayName } = generateUser();

    return {
        ...generateTokens(),
        user: { id, email, userName, displayName },
    };
};
