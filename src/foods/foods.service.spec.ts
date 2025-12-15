import { Test, TestingModule } from '@nestjs/testing';
import { MealPlansService } from './foods.service';

describe('MealPlansService', () => {
  let service: MealPlansService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealPlansService],
    }).compile();

    service = module.get<MealPlansService>(MealPlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
