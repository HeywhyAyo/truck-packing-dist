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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_entity_1 = require("./entities/item.entity");
const apiResponse_1 = require("../shared/utilities/apiResponse");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
let ItemsService = class ItemsService {
    itemRepo;
    constructor(itemRepo) {
        this.itemRepo = itemRepo;
    }
    async create(dto) {
        const item = this.itemRepo.create(dto);
        return await this.itemRepo.save(item);
    }
    async createItem(dto) {
        try {
            if (!dto.itemId) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Item ID is required');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (dto.weight <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Weight must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (dto.profit <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Profit must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const exixtItem = await this.findOneItemByItemId(dto.itemId);
            if (exixtItem) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Item with ID ${dto.itemId} already exist`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const item = await this.create(dto);
            return (0, apiResponse_1.createResponse)(true, 'Item created successfully', item.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? [
                { itemId: (0, typeorm_2.ILike)(`%${search}%`) },
                { description: (0, typeorm_2.ILike)(`%${search}%`) },
            ]
            : {};
        const [items, total] = await this.itemRepo.findAndCount({
            where: whereCondition,
            skip,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            data: items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findByItemIds(itemIds) {
        return this.itemRepo.find({
            where: itemIds.map((itemId) => ({ itemId })),
        });
    }
    async findAllItems(page = 1, limit = 10, search) {
        try {
            const truck = await this.findAll(page, limit, search);
            return (0, apiResponse_1.createResponse)(true, 'Items retrieved successfully', truck);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findseedAll() {
        return await this.itemRepo.find();
    }
    async findInStock() {
        return await this.itemRepo.find({ where: { inStock: true } });
    }
    async findItemInStock() {
        try {
            const items = await this.findInStock();
            return (0, apiResponse_1.createResponse)(true, 'Items in stock retrieved successfully', items);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findOne(id) {
        const item = await this.itemRepo.findOne({ where: { id } });
        if (!item) {
            const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Item #${id} not found`);
            throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
        }
        return item;
    }
    async findOneItemByItemId(itemId) {
        const item = await this.itemRepo.findOne({ where: { itemId } });
        return item;
    }
    async findsingleItem(id) {
        try {
            const item = await this.findOne(id);
            return (0, apiResponse_1.createResponse)(true, 'Item retrieved successfully', item);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update(id, dto) {
        const item = await this.findOne(id);
        Object.assign(item, dto);
        return this.itemRepo.save(item);
    }
    async update_Single_Item(id, dto) {
        try {
            const updateItem = await this.update(id, dto);
            return (0, apiResponse_1.createResponse)(true, 'Item updated successfully', updateItem);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async remove(id) {
        const item = await this.findOne(id);
        await this.itemRepo.remove(item);
    }
    async delete_item(id) {
        try {
            await this.remove(id);
            return (0, apiResponse_1.createResponse)(true, 'Item deleted successfully', null);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async seedExampleItems() {
        const existing = await this.itemRepo.count();
        if (existing > 0)
            return this.findseedAll();
        const seeds = [
            { itemId: 'I1', weight: 60, profit: 50, description: 'Item I1' },
            { itemId: 'I2', weight: 150, profit: 125, description: 'Item I2' },
            { itemId: 'I3', weight: 2300, profit: 1002, description: 'Item I3' },
            { itemId: 'I4', weight: 125, profit: 250, description: 'Item I4' },
        ];
        const items = this.itemRepo.create(seeds);
        return this.itemRepo.save(items);
    }
    async seedItems() {
        try {
            const seed = await this.seedExampleItems();
            return (0, apiResponse_1.createResponse)(true, 'Items seeded successfully', seed);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ItemsService);
//# sourceMappingURL=items.service.js.map