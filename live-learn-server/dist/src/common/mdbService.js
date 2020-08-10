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
exports.MdbService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const settings_json_1 = __importDefault(require("../../settings.json"));
let MdbService = class MdbService {
    constructor() {
        this.dbMap = {};
    }
    onModuleInit() {
    }
    getCli() {
        return new Promise((resolve, reject) => {
            const url = settings_json_1.default.mongo;
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
    common_1.Injectable()
], MdbService);
exports.MdbService = MdbService;
//# sourceMappingURL=mdbService.js.map