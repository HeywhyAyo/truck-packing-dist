"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OptimisationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimisationService = void 0;
const common_1 = require("@nestjs/common");
const items_service_1 = require("../items/items.service");
const trucks_service_1 = require("../trucks/trucks.service");
const rethrow_exception_1 = require("../shared/utilities/rethrow-exception");
const apiResponse_1 = require("../shared/utilities/apiResponse");
let OptimisationService = OptimisationService_1 = class OptimisationService {
    trucksService;
    itemsService;
    logger = new common_1.Logger(OptimisationService_1.name);
    constructor(trucksService, itemsService) {
        this.trucksService = trucksService;
        this.itemsService = itemsService;
    }
    optimise(items, capacityKg) {
        const feasible = items.filter((i) => i.weight <= capacityKg);
        const infeasible = items.filter((i) => i.weight > capacityKg);
        if (feasible.length === 0) {
            return this.buildResult([], items, capacityKg, 'dynamic-programming');
        }
        const rawWeights = feasible.map((i) => Math.round(i.weight));
        const g = this.gcdArray(rawWeights);
        const scaledCapacity = Math.floor(capacityKg / g);
        const scaledWeights = rawWeights.map((w) => Math.floor(w / g));
        const problemSize = feasible.length * scaledCapacity;
        this.logger.log(`Problem size: ${feasible.length} items × ${scaledCapacity} (scaled capacity) = ${problemSize}`);
        let selected;
        selected = this.dynamic_programming_worker(feasible, scaledWeights, scaledCapacity);
        let algorithm = 'dynamic-programming';
        this.logger.log(`Algorithm: ${algorithm} | Selected ${selected.length}/${feasible.length} items`);
        return this.buildResult(selected, [...infeasible, ...feasible.filter((i) => !selected.includes(i))], capacityKg, algorithm);
    }
    async system_Optimise(dto) {
        try {
            const truck = await this.trucksService.findOne(dto.truckId);
            if (!truck.isAvailable) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)(`Truck #${dto.truckId} is not currently available`);
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            let items;
            if (dto.itemIds && dto.itemIds.length > 0) {
                items = await this.itemsService.findByItemIds(dto.itemIds);
                if (items.length === 0) {
                    const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('No valid itemIds provided for optimisation');
                    throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                items = await this.itemsService.findInStock();
            }
            if (items.length === 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('No items available to optimise');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const capacity = dto.capacityOverrideKg ?? truck.maxLoadWeight;
            if (capacity <= 0) {
                const apiResponse = (0, apiResponse_1.createUnSuccessfulResponse)('Capacity must be greater than 0');
                throw new common_1.HttpException(apiResponse, common_1.HttpStatus.BAD_REQUEST);
            }
            const response = this.optimise(items, capacity);
            return (0, apiResponse_1.createResponse)(true, 'Load optimisation successful', response);
        }
        catch (error) {
            (0, rethrow_exception_1.rethrowIfHttpException)(error);
        }
    }
    dynamic_programming_worker(items, scaledWeights, scaledCapacity) {
        const n = items.length;
        const W = scaledCapacity;
        const dp = new Float64Array(W + 1);
        const keep = new Uint8Array((n + 1) * (W + 1));
        for (let i = 1; i <= n; i++) {
            const wi = scaledWeights[i - 1];
            const pi = items[i - 1].profit;
            for (let w = W; w >= wi; w--) {
                const withItem = dp[w - wi] + pi;
                if (withItem > dp[w]) {
                    dp[w] = withItem;
                    keep[i * (W + 1) + w] = 1;
                }
            }
        }
        const selected = [];
        let w = W;
        for (let i = n; i >= 1; i--) {
            if (keep[i * (W + 1) + w]) {
                selected.push(items[i - 1]);
                w -= scaledWeights[i - 1];
            }
        }
        return selected;
    }
    solveBranchAndBound(items, capacityKg) {
        const sorted = [...items].sort((a, b) => b.profit / b.weight - a.profit / a.weight);
        const n = sorted.length;
        let bestProfit = 0;
        let bestTaken = new Array(n).fill(false);
        const queue = [];
        const root = {
            level: -1,
            profit: 0,
            weight: 0,
            upperBound: this.lpUpperBound(sorted, 0, 0, capacityKg),
            taken: [],
        };
        queue.push(root);
        while (queue.length > 0) {
            queue.sort((a, b) => b.upperBound - a.upperBound);
            const node = queue.shift();
            if (node.upperBound <= bestProfit)
                continue;
            const nextLevel = node.level + 1;
            if (nextLevel >= n)
                continue;
            const item = sorted[nextLevel];
            const newWeight = node.weight + item.weight;
            if (newWeight <= capacityKg) {
                const newProfit = node.profit + item.profit;
                const newTaken = [...node.taken, true];
                if (newProfit > bestProfit) {
                    bestProfit = newProfit;
                    bestTaken = this.expandTaken(newTaken, n);
                }
                const ub = this.lpUpperBound(sorted, nextLevel + 1, newWeight, capacityKg) + newProfit;
                if (ub > bestProfit) {
                    queue.push({
                        level: nextLevel,
                        profit: newProfit,
                        weight: newWeight,
                        upperBound: ub,
                        taken: newTaken,
                    });
                }
            }
            const excludeTaken = [...node.taken, false];
            const ubExclude = this.lpUpperBound(sorted, nextLevel + 1, node.weight, capacityKg) + node.profit;
            if (ubExclude > bestProfit) {
                queue.push({
                    level: nextLevel,
                    profit: node.profit,
                    weight: node.weight,
                    upperBound: ubExclude,
                    taken: excludeTaken,
                });
            }
        }
        return sorted.filter((_, idx) => bestTaken[idx]);
    }
    lpUpperBound(sorted, startIndex, currentWeight, capacity) {
        let remainingCap = capacity - currentWeight;
        let bound = 0;
        for (let i = startIndex; i < sorted.length; i++) {
            if (remainingCap <= 0)
                break;
            const item = sorted[i];
            if (item.weight <= remainingCap) {
                bound += item.profit;
                remainingCap -= item.weight;
            }
            else {
                bound += (remainingCap / item.weight) * item.profit;
                break;
            }
        }
        return bound;
    }
    expandTaken(partial, n) {
        const full = new Array(n).fill(false);
        partial.forEach((v, i) => (full[i] = v));
        return full;
    }
    gcd(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    }
    gcdArray(nums) {
        return nums.reduce((acc, n) => this.gcd(acc, n), nums[0]);
    }
    buildResult(selected, excluded, truckCapacity, algorithmUsed) {
        const totalProfit = selected.reduce((s, i) => s + i.profit, 0);
        const totalWeight = selected.reduce((s, i) => s + i.weight, 0);
        return {
            selectedItems: selected,
            excludedItems: excluded,
            totalProfit,
            totalWeight,
            remainingCapacity: truckCapacity - totalWeight,
            truckCapacity,
            algorithmUsed,
            efficiency: totalWeight > 0 ? parseFloat((totalProfit / totalWeight).toFixed(4)) : 0,
            calculatedAt: new Date().toISOString(),
        };
    }
};
exports.OptimisationService = OptimisationService;
exports.OptimisationService = OptimisationService = OptimisationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trucks_service_1.TrucksService,
        items_service_1.ItemsService])
], OptimisationService);
//# sourceMappingURL=optimisation.service.js.map