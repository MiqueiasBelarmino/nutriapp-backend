import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Injectable()
export class ConsultationsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateConsultationDto) {
        const { weight, fatFormula, ...measures } = data;

        const fatPercent = data.fatPercent;//this.calculateFatPercent(fatFormula, measures);
        const fatMass = +(weight * (fatPercent / 100)).toFixed(2);
        const leanMass = +(weight - fatMass).toFixed(2);

        return this.prisma.consultation.create({
            data: {
                ...data,
                fatPercent,
                fatMass,
                leanMass,
            },
        });
    }

    findAll() {
        return this.prisma.consultation.findMany({
            orderBy: { date: 'desc' },
        });
    }

    findByPatient(patientId: string) {
        return this.prisma.consultation.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
        });
    }

    findOne(id: string) {
        return this.prisma.consultation.findUnique({ where: { id } });
    }

    update(id: string, data: UpdateConsultationDto) {
        return this.prisma.consultation.update({
            where: { id },
            data,
        });
    }

    remove(id: string) {
        return this.prisma.consultation.delete({ where: { id } });
    }

    private calculateFatPercent(formula: string, measures: any): number {
        const { triceps, subscapular, suprailiac, abdominal } = measures;

        switch (formula.toLowerCase()) {
            case 'faulkner4d':
                return +(0.153 * (triceps + subscapular + suprailiac + abdominal) + 5.783).toFixed(2);
            case 'pollock3d':
                // Fórmula genérica para 3 dobras (exemplo simplificado)
                return +((triceps + abdominal + suprailiac) / 3).toFixed(2);
            case 'jackson3d':
                // Simulação (substituir por fórmula real se desejar)
                return +((triceps + subscapular + suprailiac ) * 0.14 + 4.5).toFixed(2);
            default:
                throw new Error('Fórmula inválida');
        }
    }
}
