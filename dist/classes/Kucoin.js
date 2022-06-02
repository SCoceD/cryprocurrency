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
exports.Kucoin = void 0;
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../constants/constants");
class Kucoin {
    refreshCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getCurrencies();
            const result = {};
            for (const [key, value] of Object.entries(response.data.data)) {
                if (constants_1.COIN_LIST.includes(key)) {
                    // @ts-ignore
                    result[key] = +value;
                }
            }
            return result;
        });
    }
    getCurrencies() {
        return (0, axios_1.default)(constants_1.KUCOIN);
    }
}
exports.Kucoin = Kucoin;
