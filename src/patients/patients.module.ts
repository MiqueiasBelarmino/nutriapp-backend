import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { PrismaService } from '@/src/prisma/prisma.service';

@Module({
  providers: [PatientsService, PrismaService],
  controllers: [PatientsController]
})
export class PatientsModule {}
