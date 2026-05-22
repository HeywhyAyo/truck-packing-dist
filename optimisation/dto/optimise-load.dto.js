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
exports.OptimiseLoadDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OptimiseLoadDto {
    truckId;
    itemIds;
    capacityOverrideKg;
}
exports.OptimiseLoadDto = OptimiseLoadDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '83427dab-9354-4b82-85a6-843193c6a8f3', description: 'Truck ID to optimise load for' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OptimiseLoadDto.prototype, "truckId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['1', '2', '3'], description: 'List of item IDs to include' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], OptimiseLoadDto.prototype, "itemIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1200, description: 'Override capacity in kilograms' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], OptimiseLoadDto.prototype, "capacityOverrideKg", void 0);
//# sourceMappingURL=optimise-load.dto.js.map