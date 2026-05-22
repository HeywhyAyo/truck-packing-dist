import { ItemsService } from '../items/items.service';
import { TrucksService } from '../trucks/trucks.service';
import { OptimiseLoadDto } from './dto/optimise-load.dto';
import { OptimisationService } from './optimisation.service';
import { OptimisationResult } from './interfaces/optimisation-result.interface';
export declare class OptimisationController {
    private readonly optimisationService;
    private readonly trucksService;
    private readonly itemsService;
    constructor(optimisationService: OptimisationService, trucksService: TrucksService, itemsService: ItemsService);
    optimiseLoad(dto: OptimiseLoadDto): Promise<import("../shared/interfaces/aResponse").aResponse<OptimisationResult> | undefined>;
    quickLoad(truckId: string): Promise<import("../shared/interfaces/aResponse").aResponse<OptimisationResult> | undefined>;
}
