"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants/constants");
const typeorm_1 = require("typeorm");
const EntityCoin_1 = require("./entity/EntityCoin");
const EntityFavorites_1 = require("./entity/EntityFavorites");
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: constants_1.DB_HOST,
    port: constants_1.DB_PORT,
    username: constants_1.DB_USER,
    password: constants_1.DB_PASS,
    database: constants_1.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [EntityCoin_1.EntityCoin, EntityFavorites_1.EntityFavorites],
    migrations: [],
    subscribers: [],
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = AppDataSource;
