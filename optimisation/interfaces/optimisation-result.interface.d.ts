import { Item } from '../../items/entities/item.entity';
export interface OptimisationResult {
    selectedItems: Item[];
    totalProfit: number;
    totalWeight: number;
    remainingCapacity: number;
    truckCapacity: number;
    algorithmUsed: string;
    excludedItems: Item[];
    efficiency: number;
    calculatedAt: string;
}
