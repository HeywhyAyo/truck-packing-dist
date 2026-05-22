import { TruckType } from '../enum/truck.type';
export declare class Truck {
    id: string;
    name: string;
    type: TruckType;
    maxLoadWeight: number;
    registrationNumber: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
