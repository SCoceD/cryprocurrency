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
exports.listRecent = void 0;
const data_source_1 = __importDefault(require("../data-source"));
const EntityCoin_1 = require("../entity/EntityCoin");
const listRecent = (param) => __awaiter(void 0, void 0, void 0, function* () {
    const entities = yield data_source_1.default.manager.find(EntityCoin_1.EntityCoin, {
        order: {
            id: 'DESC'
        },
        take: 20
    });
    let result = '';
    entities.forEach((item, index) => {
        result += `/${item.coin} $` + (item.coin_market_cap + item.coin_base + item.coin_stats + item.kucoin + item.coin_paprika) / 5 + '\n';
    });
    return (result);
});
exports.listRecent = listRecent;
