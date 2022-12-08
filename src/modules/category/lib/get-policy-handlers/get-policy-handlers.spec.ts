import { getPolicyHandlers } from '~/modules/category/lib';

describe('getPolicyHandlers', () => {
    it('should be defined', () => {
        expect(getPolicyHandlers()).toBeDefined();
    });

    describe('createDefaultCategories', () => {
        it('should be defined', () => {
            expect(getPolicyHandlers().createDefaultCategories).toBeDefined();
        });
    });
});
