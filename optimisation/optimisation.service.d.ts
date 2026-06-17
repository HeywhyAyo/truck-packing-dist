import { Item } from '../items/entities/item.entity';
import { MultiTruckOptimisationResult, OptimisationResult } from './interfaces/optimisation-result.interface';
import { OptimiseLoadDto } from './dto/optimise-load.dto';
import { ItemsService } from "../items/items.service";
import { TrucksService } from "../trucks/trucks.service";
import { Truck } from "../trucks/entities/truck.entity";
export declare class OptimisationService {
    private readonly trucksService;
    private readonly itemsService;
    private readonly logger;
    constructor(trucksService: TrucksService, itemsService: ItemsService);
    optimise(items: Item[], capacityKg: number): OptimisationResult;
    system_Optimise(dto: OptimiseLoadDto): Promise<import("../shared/interfaces/aResponse").aResponse<OptimisationResult> | undefined>;
    multiTruckOptimise(trucks: Truck[], items: Item[]): MultiTruckOptimisationResult;
    private dynamic_programming_worker;
    private gcd;
    private gcdArray;
    private buildResult;
}
