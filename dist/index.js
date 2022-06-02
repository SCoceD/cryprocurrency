"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const constants_1 = require("./constants/constants");
const router_1 = require("./router/router");
const refreshCurrencies_1 = require("./service/refreshCurrencies");
const axios_1 = __importDefault(require("axios"));
const cron = require('node-cron');
const app = (0, express_1.default)();
app.use(router_1.router);
cron.schedule('*/5 * * * *', () => {
    (0, refreshCurrencies_1.refreshCurrencies)().then(r => console.log('running a task every 5 minute')).catch(err => console.error("error in refreshCurrencies", err));
});
cron.schedule('*/29 * * * *', () => {
    axios_1.default.get('https://calm-lowlands-23052.herokuapp.com/');
});
app.listen(constants_1.PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${constants_1.PORT}`);
});
