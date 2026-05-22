"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptimisationModule = void 0;
const common_1 = require("@nestjs/common");
const optimisation_service_1 = require("./optimisation.service");
const optimisation_controller_1 = require("./optimisation.controller");
const trucks_module_1 = require("../trucks/trucks.module");
const items_module_1 = require("../items/items.module");
let OptimisationModule = class OptimisationModule {
};
exports.OptimisationModule = OptimisationModule;
exports.OptimisationModule = OptimisationModule = __decorate([
    (0, common_1.Module)({
        imports: [trucks_module_1.TrucksModule, items_module_1.ItemsModule],
        controllers: [optimisation_controller_1.OptimisationController],
        providers: [optimisation_service_1.OptimisationService],
    })
], OptimisationModule);
//# sourceMappingURL=optimisation.module.js.map