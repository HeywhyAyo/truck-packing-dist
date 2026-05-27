import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { PaginatedResult } from "../shared/interfaces/pagination";
export declare class ItemsService {
    private readonly itemRepo;
    constructor(itemRepo: Repository<Item>);
    create(dto: CreateItemDto): Promise<Item>;
    createItem(dto: CreateItemDto): Promise<import("../shared/interfaces/aResponse").aResponse<string> | undefined>;
    findAll(page?: number, limit?: number, search?: string): Promise<PaginatedResult<Item>>;
    findByItemIds(itemIds: string[]): Promise<Item[]>;
    findAllItems(page?: number, limit?: number, search?: string): Promise<import("../shared/interfaces/aResponse").aResponse<PaginatedResult<Item>> | undefined>;
    findseedAll(): Promise<Item[]>;
    findInStock(): Promise<Item[]>;
    findItemInStock(): Promise<import("../shared/interfaces/aResponse").aResponse<Item[]> | undefined>;
    findOne(id: string): Promise<Item>;
    findOneItemByItemId(itemId: string): Promise<Item>;
    findsingleItem(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<Item> | undefined>;
    update(id: string, dto: UpdateItemDto): Promise<Item>;
    update_Single_Item(id: string, dto: UpdateItemDto): Promise<import("../shared/interfaces/aResponse").aResponse<Item> | undefined>;
    remove(id: string): Promise<void>;
    delete_item(id: string): Promise<import("../shared/interfaces/aResponse").aResponse<null> | undefined>;
    seedExampleItems(): Promise<Item[]>;
    seedItems(): Promise<import("../shared/interfaces/aResponse").aResponse<Item[]> | undefined>;
}
