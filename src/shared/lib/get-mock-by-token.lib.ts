import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';

export const getMockByToken = (token: unknown) => {
    const moduleMocker = new ModuleMocker(global);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
    const Mock = moduleMocker.generateFromMetadata(mockMetadata);

    return new Mock();
};
