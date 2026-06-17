import { Truck } from "../../trucks/entities/truck.entity";
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
export interface TruckLoadPlan {
    truck: Truck;
    selectedItems: Item[];
    totalProfit: number;
    totalWeight: number;
    remainingCapacity: number;
    truckCapacity: number;
    efficiency: number;
}
export interface MultiTruckOptimisationResult {
    truckPlans: TruckLoadPlan[];
    grandTotalProfit: number;
    grandTotalWeight: number;
    totalItemsLoaded: number;
    unallocatedItems: Item[];
    algorithmUsed: string;
    calculatedAt: string;
}
