import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FoodsService {
  constructor(private prisma: PrismaService) {}

  search(search?: string) {
    return this.prisma.food.findMany({
      where: search
        ? {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          }
        : undefined,
      take: 20,
      orderBy: { name: 'asc' },
    });
  }

  create(dto: CreateFoodDto) {
    return this.prisma.food.create({
      data: dto,
    });
  }

  findOne(id: string) {
    return this.prisma.food.findUnique({
      where: { id },
    });
  }

  update(id: string, dto: UpdateFoodDto) {
    return this.prisma.food.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: string) {
    return this.prisma.food.delete({
      where: { id },
    });
  }
}
