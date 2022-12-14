export const getPrismaServiceMock = () => ({
    $transaction: jest.fn().mockImplementation(),
});
