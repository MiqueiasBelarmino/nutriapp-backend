import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { MealPlansModule } from './meal-plans/meal-plans.module';

@Module({
  imports: [AuthModule, UsersModule, PatientsModule, ConsultationsModule, MealPlansModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
