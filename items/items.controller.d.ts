import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(dto: CreateItemDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("../shared/interfaces/pagination").PaginatedResult<import("./entities/item.entity").Item>> | undefined>;
    findInStock(): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/item.entity").Item[]> | undefined>;
    seed(): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/item.entity").Item[]> | undefined>;
    findOne(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/item.entity").Item> | undefined>;
    update(dto: UpdateItemDto): Promise<import("../shared/interfaces/aResponse").aResponse<import("./entities/item.entity").Item> | undefined>;
    remove(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
}
