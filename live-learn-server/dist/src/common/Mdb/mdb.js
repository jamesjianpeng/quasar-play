"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMdb = exports.getCol = exports.getDbCol = exports.getClient = void 0;
const mongodb_1 = require("mongodb");
console.log(process.env.ENV);
const devUrl = 'mongodb://127.0.0.1';
const url = 'mongodb://jamesjianpeng:jamesjianpeng@120.24.146.140:27017';
const dbName = 'admin';
const cli = {
    getCol: {}
};
const getClient = async (url, dbName) => {
    const client = await mongodb_1.MongoClient.connect(url);
    return Promise.resolve(client.db(dbName));
};
exports.getClient = getClient;
const getDbCol = async (dbName, col) => {
    const getCol = await getClient(url, dbName);
    return await getCol.collection(col);
};
exports.getDbCol = getDbCol;
const getCol = (col) => {
    return cli.getCol.collection(col);
};
exports.getCol = getCol;
const initMdb = async (env) => {
    console.log('init Mongodb');
    const baseUrl = env === 'dev' ? devUrl : url;
    console.log(url);
    const getCol = await getClient(url, dbName);
    console.log('init Mongodb - finish getCol');
    cli.getCol = getCol;
};
exports.initMdb = initMdb;
initMdb();
//# sourceMappingURL=mdb.js.map