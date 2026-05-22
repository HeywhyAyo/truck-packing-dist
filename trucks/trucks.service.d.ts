import { Repository } from 'typeorm';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './entities/truck.entity';
import { PaginatedResult } from "../shared/interfaces/pagination";
export declare class TrucksService {
    private readonly truckRepo;
    constructor(truckRepo: Repository<Truck>);
    create(dto: CreateTruckDto): Promise<Truck>;
    create_truck(dto: CreateTruckDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page?: number, limit?: number, search?: string): Promise<PaginatedResult<Truck>>;
    findseedAll(): Promise<Truck[]>;
    findAvailable(page?: number, limit?: number, search?: string): Promise<PaginatedResult<Truck>>;
    findOne(id: string): Promise<Truck>;
    findOneById(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Truck> | undefined>;
    findAllTrucks(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Truck>> | undefined>;
    findAvailableTruck(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Truck>> | undefined>;
    update(id: string, dto: UpdateTruckDto): Promise<Truck>;
    update_truck(id: string, dto: UpdateTruckDto): Promise<import("../shared/interfaces/aResponse").aResponse<Truck> | undefined>;
    remove(id: string): Promise<void>;
    delete_truck(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    seedExampleTrucks(): Promise<Truck[]>;
    seedTrucks(): Promise<import("../shared/interfaces/aResponse").aResponse<Truck[]> | undefined>;
}
