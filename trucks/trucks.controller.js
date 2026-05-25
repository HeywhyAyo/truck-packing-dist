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
exports.TrucksController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_truck_dto_1 = require("./dto/create-truck.dto");
const update_truck_dto_1 = require("./dto/update-truck.dto");
const trucks_service_1 = require("./trucks.service");
let TrucksController = class TrucksController {
    trucksService;
    constructor(trucksService) {
        this.trucksService = trucksService;
    }
    async create(dto) {
        return await this.trucksService.create_truck(dto);
    }
    async findAll(page = 1, limit = 10, search) {
        return await this.trucksService.findAllTrucks(page, limit, search);
    }
    async findAvailable(page = 1, limit = 10, search) {
        return this.trucksService.findAvailableTruck(page, limit, search);
    }
    async seed() {
        return this.trucksService.seedTrucks();
    }
    async findOne(id) {
        return await this.trucksService.findOneById(id);
    }
    async update(dto) {
        return this.trucksService.update_truck(dto.id, dto);
    }
    async remove(id) {
        return this.trucksService.delete_truck(id);
    }
};
exports.TrucksController = TrucksController;
__decorate([
    (0, common_1.Post)('new-truck'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new truck' }),
    (0, swagger_1.ApiBody)({ type: create_truck_dto_1.CreateTruckDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_truck_dto_1.CreateTruckDto]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        description: "Page number for pagination (default: 1)",
        example: 1,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of items per page (default: 10)",
        example: 10,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search by truck id or description (case-insensitive, partial match)",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'List all trucks' }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('available'),
    (0, swagger_1.ApiQuery)({
        name: "page",
        required: false,
        description: "Page number for pagination (default: 1)",
        example: 1,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        required: false,
        description: "Number of items per page (default: 10)",
        example: 10,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search by truck name (case-insensitive, partial match)",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'List or search for all available trucks' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Available trucks' }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "findAvailable", null);
__decorate([
    (0, common_1.Get)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed example trucks' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Seeded example trucks', type: [create_truck_dto_1.CreateTruckDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)('single/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single truck by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Truck database ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update-truck/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a truck partially' }),
    (0, swagger_1.ApiBody)({ type: update_truck_dto_1.UpdateTruckDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Updated truck', type: create_truck_dto_1.CreateTruckDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_truck_dto_1.UpdateTruckDto]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete-truck/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a truck' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Truck database ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Truck deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrucksController.prototype, "remove", null);
exports.TrucksController = TrucksController = __decorate([
    (0, swagger_1.ApiTags)('trucks'),
    (0, common_1.Controller)('trucks'),
    __metadata("design:paramtypes", [trucks_service_1.TrucksService])
], TrucksController);
//# sourceMappingURL=trucks.controller.js.map