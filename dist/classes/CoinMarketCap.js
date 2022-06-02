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
exports.CoinMarketCap = void 0;
const constants_1 = require("../constants/constants");
const axios_1 = __importDefault(require("axios"));
class CoinMarketCap {
    refreshCurrency() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getCurrencies();
            const result = {};
            response.data.data.forEach((item) => {
                if (constants_1.COIN_LIST.includes(item.symbol)) {
                    const fieldName = item.symbol;
                    result[fieldName] = item.quote.USD.price;
                }
            });
            return result;
        });
    }
    getCurrencies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(constants_1.COINMARKETCAP_API, {
                headers: {
                    "X-CMC_PRO_API_KEY": constants_1.APIKEY,
                },
            });
        });
    }
}
exports.CoinMarketCap = CoinMarketCap;
//   'Bitcoin'                                              BTC
//   'Ethereum'                                             ETH
//   'Tether'                                               USDT
//   'USD Coin'                                             USDC
//   'Bitcoin hash'                                         BCH
//   'Zcash'                                                ZEC
//   'ApeCoin'                                              APE
//   'Cardano'                                              ADA
//   'Solana'                                               SOL
//   'Dogecoin'                                             DOGE
//   'Polkadot'                                             DOT
//   'Wrapped Bitcoin'                                      WBTC
//   'Avalanche'                                            AVAX
//   'Ethereum Classic'                                     ETC
//   'Dai'                                                  DAI
//   'Shiba Inu'                                            SHIB
//   'Polygon'                                              MATIC
//   'Decentraland'                                         MANA
//   'Cronos'                                               CRO
//   'Litecoin'                                             LTC
