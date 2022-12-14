import { generateCategory } from '~/shared/constants/test';

export const getSwaggerParamExample = () => {
    return generateCategory().id;
};
