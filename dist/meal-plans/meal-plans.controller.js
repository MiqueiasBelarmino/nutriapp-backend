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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealPlansController = void 0;
const common_1 = require("@nestjs/common");
const meal_plans_service_1 = require("./meal-plans.service");
const create_meal_plan_dto_1 = require("./dto/create-meal-plan.dto");
const update_meal_plan_dto_1 = require("./dto/update-meal-plan.dto");
let MealPlansController = class MealPlansController {
    constructor(mealPlansService) {
        this.mealPlansService = mealPlansService;
    }
    create(data) {
        data.date = new Date(data.date);
        return this.mealPlansService.create(data);
    }
    findAll() {
        return this.mealPlansService.findAll();
    }
    findByPatient(patientId) {
        return this.mealPlansService.findByPatient(patientId);
    }
    findOne(id) {
        return this.mealPlansService.findOne(id);
    }
    update(id, data) {
        return this.mealPlansService.update(id, data);
    }
    remove(id) {
        return this.mealPlansService.remove(id);
    }
};
exports.MealPlansController = MealPlansController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_meal_plan_dto_1.CreateMealPlanDto]),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_meal_plan_dto_1.UpdateMealPlanDto]),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MealPlansController.prototype, "remove", null);
exports.MealPlansController = MealPlansController = __decorate([
    (0, common_1.Controller)('meal-plans'),
    __metadata("design:paramtypes", [meal_plans_service_1.MealPlansService])
], MealPlansController);
//# sourceMappingURL=meal-plans.controller.js.map