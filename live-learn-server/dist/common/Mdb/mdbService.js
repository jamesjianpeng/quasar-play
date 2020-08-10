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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MdbService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const constants_1 = require("./constants");
let MdbService = class MdbService {
    constructor(options) {
        this.options = options;
        this.dbMap = {};
    }
    onModuleInit() {
        console.log(this.options);
        return this.options;
    }
    getCli() {
        return new Promise((resolve, reject) => {
            const url = this.options.url;
            mongodb_1.MongoClient.connect(url, { useNewUrlParser: true, poolSize: 30 }, (err, cli) => {
                if (err) {
                    return reject(err);
                }
                resolve(cli);
            });
        });
    }
    async getDb(db) {
        const currentDb = this.dbMap[db];
        if (currentDb) {
            const cli = await this.getCli();
            const Db = cli.db(db);
            this.dbMap[db] = Db;
            return Db;
        }
        else {
            return currentDb;
        }
    }
    async getCol(db, col) {
        return await db.collection(col);
    }
};
MdbService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.MDB_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MdbService);
exports.MdbService = MdbService;
//# sourceMappingURL=MdbService.js.map