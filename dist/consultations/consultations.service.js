"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConsultationsService = class ConsultationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { weight, fatFormula, ...measures } = data;
        const fatPercent = this.calculateFatPercent(fatFormula, measures);
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
    findByPatient(patientId) {
        return this.prisma.consultation.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.consultation.findUnique({ where: { id } });
    }
    update(id, data) {
        return this.prisma.consultation.update({
            where: { id },
            data,
        });
    }
    remove(id) {
        return this.prisma.consultation.delete({ where: { id } });
    }
    calculateFatPercent(formula, measures) {
        const { triceps, subscapular, suprailiac, abdominal } = measures;
        switch (formula.toLowerCase()) {
            case 'faulkner':
                return +(0.153 * (triceps + subscapular + suprailiac + abdominal) + 5.783).toFixed(2);
            case 'pollock':
                return +((triceps + abdominal + suprailiac) / 3).toFixed(2);
            case 'jackson':
                return +((triceps + subscapular + suprailiac + abdominal) * 0.14 + 4.5).toFixed(2);
            default:
                throw new Error('Fórmula inválida');
        }
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map