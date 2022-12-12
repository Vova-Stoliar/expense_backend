import { generateCategoryTransaction } from '~/modules/category-transaction/constants/test';

export const getSwaggerResponseExample = () => {
    const { id, notes, amount, createdAt, updatedAt } = generateCategoryTransaction();

    return { id, notes, amount, createdAt, updatedAt };
};

export const getSwaggerParamExample = () => {
    return generateCategoryTransaction().id;
};
