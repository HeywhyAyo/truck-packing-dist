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
exports.UpdateItemDto = void 0;
const create_item_dto_1 = require("./create-item.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateItemDto extends create_item_dto_1.CreateItemDto {
    id;
}
exports.UpdateItemDto = UpdateItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ee0bbde8-0079-4084-b6ae-2cd71acf222a', description: 'Item identifier' }),
    __metadata("design:type", String)
], UpdateItemDto.prototype, "id", void 0);
//# sourceMappingURL=update-item.dto.js.map