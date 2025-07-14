import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Controller('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  create(@Body() data: CreateConsultationDto) {
    data.date = new Date(data.date);
    return this.consultationsService.create(data);
  }

  @Get()
  findAll() {
    return this.consultationsService.findAll();
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.consultationsService.findByPatient(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateConsultationDto) {
    return this.consultationsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationsService.remove(id);
  }
}