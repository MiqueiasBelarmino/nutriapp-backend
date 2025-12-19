import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
} from '@nestjs/common';
import { MealPlansService } from './meal-plans.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';

@Controller('meal-plans')
export class MealPlansController {
    constructor(private readonly mealPlansService: MealPlansService) { }

    @Post()
    create(@Body() data: CreateMealPlanDto) {
        data.date = new Date(data.date); 
        return this.mealPlansService.create(data);
    }

    @Post('suggestion')
    generateSuggestion(@Body() body: { patientId: string }) {
        return this.mealPlansService.generateSuggestion(body.patientId);
    }

    @Get()
    findAll() {
        return this.mealPlansService.findAll();
    }

    @Get('patient/:patientId')
    findByPatient(@Param('patientId') patientId: string) {
        return this.mealPlansService.findByPatient(patientId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.mealPlansService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateMealPlanDto) {
        return this.mealPlansService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.mealPlansService.remove(id);
    }
}
