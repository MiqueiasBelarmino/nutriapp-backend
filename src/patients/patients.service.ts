import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreatePatientDto) {
    try {
      return await this.prisma.patient.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email já cadastrado');
      }

      throw new InternalServerErrorException(error.message);
    }
  }


  findAll() {
    return this.prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
    });
  }

  update(id: string, data: UpdatePatientDto) {
    if (data.birthDate) {
      data.birthDate = new Date(data.birthDate);
    }
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    try {
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'Não é possível excluir o paciente porque existem consultas associadas.'
        );
      }

      throw new InternalServerErrorException('Erro desconhecido ao excluir paciente.');
    }
  }

  findConsultations(id: string) {
    return this.prisma.patient.findUnique({
      where: { id },
    }).consultations();
  }
}
