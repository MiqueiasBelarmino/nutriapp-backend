import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma connected successfully');
    } catch (error) {
      console.error('❌ Prisma connection failed during onModuleInit:', error.message);
      // Don't throw here to allow the app to boot, though it will fail later
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
