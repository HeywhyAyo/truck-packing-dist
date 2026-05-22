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
exports.CreateTruckDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const truck_type_1 = require("../enum/truck.type");
class CreateTruckDto {
    name;
    type;
    maxLoadWeight;
    registrationNumber;
    isAvailable;
}
exports.CreateTruckDto = CreateTruckDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Express Hauler', description: 'Truck identifier name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: truck_type_1.TruckType, description: 'Type of truck' }),
    (0, class_validator_1.IsEnum)(truck_type_1.TruckType),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Maximum load capacity in kilograms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateTruckDto.prototype, "maxLoadWeight", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'AB12 CDE', description: 'Optional registration number' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTruckDto.prototype, "registrationNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Truck availability status' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTruckDto.prototype, "isAvailable", void 0);
//# sourceMappingURL=create-truck.dto.js.map