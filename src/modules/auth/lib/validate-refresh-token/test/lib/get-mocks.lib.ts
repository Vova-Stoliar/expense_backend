import bcrypt from 'bcrypt';

export const getMocks = () => {
    const compare = jest.spyOn(bcrypt, 'compare');

    return { compare };
};
