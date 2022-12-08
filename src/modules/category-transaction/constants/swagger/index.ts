import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getSwaggerResponseExample = () => {
    const { id, notes, amount } = generateCategoryTransaction();

    return { id, notes, amount };
};

export const getSwaggerParamExample = () => {
    return generateCategoryTransaction().id;
};
