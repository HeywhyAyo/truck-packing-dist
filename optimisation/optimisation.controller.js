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
exports.OptimisationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const items_service_1 = require("../items/items.service");
const trucks_service_1 = require("../trucks/trucks.service");
const optimise_load_dto_1 = require("./dto/optimise-load.dto");
const optimisation_service_1 = require("./optimisation.service");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let OptimisationController = class OptimisationController {
    optimisationService;
    trucksService;
    itemsService;
    constructor(optimisationService, trucksService, itemsService) {
        this.optimisationService = optimisationService;
        this.trucksService = trucksService;
        this.itemsService = itemsService;
    }
    async optimiseLoad(dto) {
        return this.optimisationService.system_Optimise(dto);
    }
    async optimiseMultipleLoads(dto) {
        try {
            let trucks;
            if (dto.truckIds?.length) {
                trucks = await Promise.all(dto.truckIds.map((id) => this.trucksService.findOne(id)));
                const unavailable = trucks.filter((t) => !t.isAvailable);
                if (unavailable.length) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`These trucks are not available: ${unavailable.map((t) => t.name).join(', ')}`);
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                trucks = await this.trucksService.findAvailableNoPagination();
            }
            if (trucks.length === 0) {
                throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)('No available trucks to load'), common_1.HttpStatus.BAD_REQUEST);
            }
            let items;
            if (dto.itemIds?.length) {
                items = await this.itemsService.findByItemIds(dto.itemIds);
                if (items.length === 0) {
                    throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`None of the provided itemIds were found: ${dto.itemIds.join(', ')}`), common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                items = await this.itemsService.findInStock();
            }
            if (items.length === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('No items available to optimise');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const result = this.optimisationService.multiTruckOptimise(trucks, items);
            return (0, apiResponse_1.createResponse)(true, 'Multi-truck optimisation completed successfully', result);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async loadFleet() {
        return this.optimiseMultipleLoads({});
    }
    async quickLoad(truckId) {
        return await this.optimiseLoad({ truckId });
    }
};
exports.OptimisationController = OptimisationController;
__decorate([
    (0, common_1.Post)('load'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimise truck load with selected items or all in-stock items' }),
    (0, swagger_1.ApiBody)({ type: optimise_load_dto_1.OptimiseLoadDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Optimisation result containing selected items and load metrics',
        schema: {
            example: {
                selectedItems: [],
                totalProfit: 1500,
                totalWeight: 1800,
                remainingCapacity: 200,
                truckCapacity: 2000,
                algorithmUsed: 'dynamic-programming',
                excludedItems: [],
                efficiency: 0.83,
                calculatedAt: '2026-05-13T12:34:56.789Z',
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid optimisation request or unavailable truck' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [optimise_load_dto_1.OptimiseLoadDto]),
    __metadata("design:returntype", Promise)
], OptimisationController.prototype, "optimiseLoad", null);
__decorate([
    (0, common_1.Post)('load-multiple'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [optimise_load_dto_1.OptimiseMultipleLoadsDto]),
    __metadata("design:returntype", Promise)
], OptimisationController.prototype, "optimiseMultipleLoads", null);
__decorate([
    (0, common_1.Get)('load-fleet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OptimisationController.prototype, "loadFleet", null);
__decorate([
    (0, common_1.Get)('load/:truckId'),
    (0, swagger_1.ApiOperation)({ summary: 'Optimise load for a truck using all in-stock items' }),
    (0, swagger_1.ApiParam)({ name: 'truckId', type: String, description: 'Truck database ID' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Optimisation result for the truck',
        schema: {
            example: {
                selectedItems: [],
                totalProfit: 1500,
                totalWeight: 1800,
                remainingCapacity: 200,
                truckCapacity: 2000,
                algorithmUsed: 'dynamic-programming',
                excludedItems: [],
                efficiency: 0.83,
                calculatedAt: '2026-05-13T12:34:56.789Z',
            },
        },
    }),
    __param(0, (0, common_1.Param)('truckId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OptimisationController.prototype, "quickLoad", null);
exports.OptimisationController = OptimisationController = __decorate([
    (0, swagger_1.ApiTags)('optimisation'),
    (0, common_1.Controller)('optimisation'),
    __metadata("design:paramtypes", [optimisation_service_1.OptimisationService,
        trucks_service_1.TrucksService,
        items_service_1.ItemsService])
], OptimisationController);
//# sourceMappingURL=optimisation.controller.js.map