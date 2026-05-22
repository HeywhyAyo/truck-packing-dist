import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TrucksService } from './trucks.service';
export declare class TrucksController {
    private readonly trucksService;
    constructor(trucksService: TrucksService);
    create(dto: CreateTruckDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/truck.entity").Truck>> | undefined>;
    findAvailable(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/truck.entity").Truck>> | undefined>;
    seed(): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/truck.entity").Truck[]> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/truck.entity").Truck> | undefined>;
    update(dto: UpdateTruckDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/truck.entity").Truck> | undefined>;
    remove(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
}
