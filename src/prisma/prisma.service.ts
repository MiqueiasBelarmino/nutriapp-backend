import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Prisma connects lazily by default. Removing explicit connect to avoid startup timeouts on Render.
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
