import { TruckType } from '../enum/truck.type';
export declare class CreateTruckDto {
    name: string;
    type: TruckType;
    maxLoadWeight: number;
    registrationNumber?: string;
    isAvailable?: boolean;
}
