import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    const databaseUrl = process.env.DATABASE_URL;
    const isInternal = databaseUrl?.includes('internal');
    
    console.log(`📡 Attempting to connect to database... (Internal URL: ${isInternal ? 'Yes' : 'No'})`);

    try {
      await this.$connect();
      console.log('✅ Prisma connected successfully to the database');
    } catch (error) {
      console.error('❌ Prisma connection failed during onModuleInit');
      console.error('Error details:', error.message);
      
      if (error.message.includes('P1017')) {
        console.error('💡 Tip: P1017 (Server closed connection) often means you need to use the Internal Database URL on Render or append ?sslmode=require.');
      }
      
      // Don't throw here to allow the app to boot, though it will fail later
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
