import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTransactionController } from './category-transaction.controller';
import { CategoryTransactionService } from '../transaction-service/category-transaction.service';

describe('TransactionController', () => {
    let controller: CategoryTransactionController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CategoryTransactionController],
            providers: [CategoryTransactionService],
        }).compile();

        controller = module.get<CategoryTransactionController>(CategoryTransactionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
