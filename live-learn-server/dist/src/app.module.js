"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const MdbModule_1 = require("./common/Mdb/MdbModule");
const settings_json_1 = __importDefault(require("../settings.json"));
const dist_1 = require("@smartblog/nestjs-mdb-lib/dist");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            MdbModule_1.MdbModule.register([
                { url: settings_json_1.default.mongo_sz, key: 'sz' },
                { url: settings_json_1.default.mongo_hk, key: 'hk' }
            ]),
            dist_1.NestjsMdbLibModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map