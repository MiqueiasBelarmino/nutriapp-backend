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
exports.MealPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MealPlansService = class MealPlansService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.mealPlan.create({ data });
    }
    findAll() {
        return this.prisma.mealPlan.findMany({
            orderBy: { date: 'desc' },
        });
    }
    findByPatient(patientId) {
        return this.prisma.mealPlan.findMany({
            where: { patientId },
            orderBy: { date: 'desc' },
        });
    }
    findOne(id) {
        return this.prisma.mealPlan.findUnique({ where: { id } });
    }
    update(id, data) {
        return this.prisma.mealPlan.update({
            where: { id },
            data,
        });
    }
    remove(id) {
        return this.prisma.mealPlan.delete({ where: { id } });
    }
};
exports.MealPlansService = MealPlansService;
exports.MealPlansService = MealPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MealPlansService);
//# sourceMappingURL=meal-plans.service.js.map