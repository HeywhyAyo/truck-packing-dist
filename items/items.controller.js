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
exports.ItemsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_item_dto_1 = require("./dto/create-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const items_service_1 = require("./items.service");
let ItemsController = class ItemsController {
    itemsService;
    constructor(itemsService) {
        this.itemsService = itemsService;
    }
    async create(dto) {
        return await this.itemsService.createItem(dto);
    }
    async findAll(page = 1, limit = 10, search) {
        return await this.itemsService.findAllItems(page, limit, search);
    }
    async findInStock() {
        return await this.itemsService.findItemInStock();
    }
    async seed() {
        return await this.itemsService.seedItems();
    }
    async findOne(id) {
        return await this.itemsService.findsingleItem(id);
    }
    async update(dto) {
        return await this.itemsService.update_Single_Item(dto.id, dto);
    }
    async remove(id) {
        return await this.itemsService.delete_item(id);
    }
};
exports.ItemsController = ItemsController;
__decorate([
    (0, common_1.Post)('new-item'),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new item to inventory' }),
    (0, swagger_1.ApiBody)({ type: create_item_dto_1.CreateItemDto }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Created item' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_item_dto_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all-items'),
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
        description: "Search by email",
        type: String,
    }),
    (0, swagger_1.ApiOperation)({ summary: 'List all inventory items' }),
    __param(0, (0, common_1.Query)("page")),
    __param(1, (0, common_1.Query)("limit")),
    __param(2, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('in-stock'),
    (0, swagger_1.ApiOperation)({ summary: 'List items currently in stock' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Items currently available' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findInStock", null);
__decorate([
    (0, common_1.Get)('seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed example inventory items' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Seeded example items' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "seed", null);
__decorate([
    (0, common_1.Get)('single-item/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get item details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Item database ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('update-item/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an item partially' }),
    (0, swagger_1.ApiBody)({ type: update_item_dto_1.UpdateItemDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('delete-item/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an item by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: String, description: 'Item database ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "remove", null);
exports.ItemsController = ItemsController = __decorate([
    (0, swagger_1.ApiTags)('items'),
    (0, common_1.Controller)('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], ItemsController);
//# sourceMappingURL=items.controller.js.map