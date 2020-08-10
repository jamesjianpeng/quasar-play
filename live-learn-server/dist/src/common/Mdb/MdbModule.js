"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MdbModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdbModule = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const MdbService_1 = require("./MdbService");
let MdbModule = MdbModule_1 = class MdbModule {
    static register(options) {
        return {
            module: MdbModule_1,
            providers: [
                {
                    provide: constants_1.MDB_OPTIONS,
                    useValue: options,
                },
                MdbService_1.MdbService
            ],
            exports: [MdbService_1.MdbService],
        };
    }
};
MdbModule = MdbModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({})
], MdbModule);
exports.MdbModule = MdbModule;
//# sourceMappingURL=MdbModule.js.map