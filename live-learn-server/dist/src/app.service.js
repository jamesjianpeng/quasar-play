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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_mdb_lib_1 = require("@smartblog/nestjs-mdb-lib");
let AppService = class AppService {
    constructor(nestjsMdbLibService) {
        this.nestjsMdbLibService = nestjsMdbLibService;
    }
    onModuleInit() {
    }
    async test() {
        const data = { cliKey: 'sz', db: 'ghost-live&learn', col: 'subject_sz' };
        const col = await this.nestjsMdbLibService.getCol(data);
        await col.insertOne({ subject: '数据库概率', code: '02323' });
        const dd = { cliKey: 'hk', db: 'ghost-live&learn', col: 'subject_hk' };
        const colHk = await this.nestjsMdbLibService.getCol(dd);
        return Promise.resolve({ hk: await (await colHk.find()).toArray(), sz: await (await col.find()).toArray() });
    }
    async getHello() {
        return 'Hello World!';
    }
    async testLib() {
        return this.nestjsMdbLibService.test();
    }
    async testMdb() {
        return await this.test();
    }
};
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_mdb_lib_1.NestjsMdbLibService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map