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
exports.saveInDb = exports.refreshCurrencies = void 0;
const EntityCoin_1 = require("../entity/EntityCoin");
const CoinMarketCap_1 = require("../classes/CoinMarketCap");
const CoinBase_1 = require("../classes/CoinBase");
const CoinStats_1 = require("../classes/CoinStats");
const Kucoin_1 = require("../classes/Kucoin");
const CoinPaprika_1 = require("../classes/CoinPaprika");
const constants_1 = require("../constants/constants");
const data_source_1 = __importDefault(require("../data-source"));
const refreshCurrencies = () => __awaiter(void 0, void 0, void 0, function* () {
    const coinMarketCapRes = yield new CoinMarketCap_1.CoinMarketCap().refreshCurrency();
    const coinBase = yield new CoinBase_1.CoinBase().refreshCurrency();
    const coinStats = yield new CoinStats_1.CoinStats().refreshCurrency();
    const kucoin = yield new Kucoin_1.Kucoin().refreshCurrency();
    const coinPaprika = yield new CoinPaprika_1.CoinPaprika().refreshCurrency();
    constants_1.COIN_LIST.forEach((item) => {
        saveInDb(item, coinMarketCapRes[item], coinBase[item], coinStats[item], kucoin[item], coinPaprika[item]);
    });
});
exports.refreshCurrencies = refreshCurrencies;
const saveInDb = (coin, coin_market_cap, coin_base, coin_paprika, coin_stats, kucoin) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Inserting new into the database...");
    const entity = new EntityCoin_1.EntityCoin();
    entity.coin = coin;
    entity.coin_market_cap = coin_market_cap;
    entity.coin_base = coin_base;
    entity.coin_paprika = coin_paprika;
    entity.coin_stats = coin_stats;
    entity.kucoin = kucoin;
    entity.time = new Date();
    yield data_source_1.default.manager.save(EntityCoin_1.EntityCoin, entity);
});
exports.saveInDb = saveInDb;
