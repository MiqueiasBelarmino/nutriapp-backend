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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const consultations_service_1 = require("./consultations.service");
const create_consultation_dto_1 = require("./dto/create-consultation.dto");
const update_consultation_dto_1 = require("./dto/update-consultation.dto");
let ConsultationsController = class ConsultationsController {
    constructor(consultationsService) {
        this.consultationsService = consultationsService;
    }
    create(data) {
        return this.consultationsService.create(data);
    }
    findAll() {
        return this.consultationsService.findAll();
    }
    findByPatient(patientId) {
        return this.consultationsService.findByPatient(patientId);
    }
    findOne(id) {
        return this.consultationsService.findOne(id);
    }
    update(id, data) {
        return this.consultationsService.update(id, data);
    }
    remove(id) {
        return this.consultationsService.remove(id);
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('patient/:patientId'),
    __param(0, (0, common_1.Param)('patientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findByPatient", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_dto_1.UpdateConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "remove", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, common_1.Controller)('consultations'),
    __metadata("design:paramtypes", [consultations_service_1.ConsultationsService])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map