"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinInfo = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const EntityCoin_1 = require("../entity/EntityCoin");
const constants_1 = require("../constants/constants");
const EntityFavorites_1 = require("../entity/EntityFavorites");
const getCoinInfo = (param) => __awaiter(void 0, void 0, void 0, function* () {
    let result = `/${param} : `;
    let arrPromises = [];
    constants_1.TIME_PERIODS_INFO_MINUTES.forEach((time) => {
        arrPromises.push(getCoinInfoForInterval(param, time));
    });
    yield Promise.all(arrPromises)
        .then(arr => {
        arr.forEach((item, index) => {
            const timeInHour = constants_1.TIME_PERIODS_INFO_MINUTES[index] < 60
                ? `${constants_1.TIME_PERIODS_INFO_MINUTES[index]}m`
                : constants_1.TIME_PERIODS_INFO_MINUTES[index] / 60 + 'h';
            result += `For ${timeInHour} - ` + item + '\n';
        });
    });
    const resDbFavorite = yield data_source_1.default.manager.findOne(EntityFavorites_1.EntityFavorites, {
        where: {
            coin: `${param}`,
        }
    });
    const inFavorite = resDbFavorite === null ? false : resDbFavorite.InFlowing;
    return [result, inFavorite];
});
exports.getCoinInfo = getCoinInfo;
const getCoinInfoForInterval = (param, minutes) => __awaiter(void 0, void 0, void 0, function* () {
    const timePeriod = minutes / constants_1.REFRESH_TIME;
    let result = 0;
    const resDB = yield data_source_1.default.manager.find(EntityCoin_1.EntityCoin, {
        where: {
            coin: `${param}`,
        },
        order: {
            id: 'DESC',
        },
        take: timePeriod,
    });
    resDB.forEach((item) => {
        result += (item.coin_market_cap + item.coin_base + item.coin_stats + item.kucoin + item.coin_paprika) / 5;
    });
    return result / timePeriod;
});
