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