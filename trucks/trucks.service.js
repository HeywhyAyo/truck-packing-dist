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
exports.TrucksService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const truck_entity_1 = require("./entities/truck.entity");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let TrucksService = class TrucksService {
    truckRepo;
    constructor(truckRepo) {
        this.truckRepo = truckRepo;
    }
    async create(dto) {
        const truck = this.truckRepo.create(dto);
        const res = await this.truckRepo.save(truck);
        return res;
    }
    async create_truck(dto) {
        try {
            if (dto.maxLoadWeight <= 0 || dto.maxLoadWeight === undefined) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('maximum Load Weight must be a positive number');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!dto.type || !['Small Truck', 'Medium Truck', 'Large Truck'].includes(dto.type)) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Invalid truck type. Must be one of: Small Truck, Medium Truck, Large Truck');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!dto.name || dto.name.trim() === '') {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Truck name is required and cannot be empty');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const identicalTrck = await this.findTruckByRegNo(dto.registrationNumber);
            if (identicalTrck) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Truck with this ${dto.registrationNumber} already exist`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!dto.name || dto.name.trim() === '') {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Truck name is required and cannot be empty');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const truck = await this.create(dto);
            return (0, apiResponse_1.createResponse)(true, 'Truck created successfully', truck.id);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAll(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? [
                { name: (0, typeorm_2.ILike)(`%${search}%`) },
                { type: (0, typeorm_2.ILike)(`%${search}%`) },
            ]
            : {};
        const [items, total] = await this.truckRepo.findAndCount({
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
    findseedAll() {
        return this.truckRepo.find();
    }
    async findAvailable(page = 1, limit = 10, search) {
        const skip = (page - 1) * limit;
        const whereCondition = search
            ? [
                { isAvailable: true, name: (0, typeorm_2.ILike)(`%${search}%`) },
            ]
            : { isAvailable: true };
        const [items, total] = await this.truckRepo.findAndCount({
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
    async findOne(id) {
        const truck = await this.truckRepo.findOne({ where: { id } });
        if (!truck)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Truck #${id} not found`), common_1.HttpStatus.BAD_REQUEST);
        return truck;
    }
    async findTruckByRegNo(regno) {
        const truck = await this.truckRepo.findOne({ where: { registrationNumber: regno } });
        if (!truck)
            throw new common_1.HttpException((0, apiResponse_1.createUnSuccessfulResponse)(`Truck #${regno} not found`), common_1.HttpStatus.BAD_REQUEST);
        return truck;
    }
    async findOneById(id) {
        try {
            const truck = await this.findOne(id);
            return (0, apiResponse_1.createResponse)(true, 'Truck found', truck);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAllTrucks(page = 1, limit = 10, search) {
        try {
            const truck = await this.findAll(page, limit, search);
            return (0, apiResponse_1.createResponse)(true, 'Trucks retrieved successfully', truck);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async findAvailableTruck(page = 1, limit = 10, search) {
        try {
            const truck = await this.findAvailable(page, limit, search);
            return (0, apiResponse_1.createResponse)(true, 'Available trucks retrieved successfully', truck);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async update(id, dto) {
        const truck = await this.findOne(id);
        Object.assign(truck, dto);
        return this.truckRepo.save(truck);
    }
    async update_truck(id, dto) {
        try {
            const updateTruck = await this.update(id, dto);
            return (0, apiResponse_1.createResponse)(true, 'Truck updated successfully', updateTruck);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async remove(id) {
        const truck = await this.findOne(id);
        await this.truckRepo.remove(truck);
    }
    async delete_truck(id) {
        try {
            await this.remove(id);
            return (0, apiResponse_1.createResponse)(true, 'Truck deleted successfully', null);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    async seedExampleTrucks() {
        const existing = await this.truckRepo.count();
        if (existing > 0)
            return this.findseedAll();
        const seeds = [
            { name: 'Suzuki Supercarry', registrationNumber: "Trsdysvdf", type: 'Small Truck', maxLoadWeight: 740 },
            { name: 'Ford Transit', registrationNumber: "ffvjdfvjdfvj", type: 'Medium Truck', maxLoadWeight: 1500 },
            { name: 'MAN TGX', registrationNumber: "Trsdyssgvdfvdg", type: 'Large Truck', maxLoadWeight: 22000 },
        ];
        const trucks = this.truckRepo.create(seeds);
        return this.truckRepo.save(trucks);
    }
    async seedTrucks() {
        try {
            const seed = await this.seedExampleTrucks();
            return (0, apiResponse_1.createResponse)(true, 'Trucks seeded successfully', seed);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
};
exports.TrucksService = TrucksService;
exports.TrucksService = TrucksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(truck_entity_1.Truck)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrucksService);
//# sourceMappingURL=trucks.service.js.map