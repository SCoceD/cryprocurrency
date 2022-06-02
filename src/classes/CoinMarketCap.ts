import {APIKEY, COIN_LIST, COINMARKETCAP_API} from "../constants/constants";
import axios from "axios";

export class CoinMarketCap implements RefreshCurrency {
    async refreshCurrency() {
        const response = await this.getCurrencies();
        const result: any = {};
        response.data.data.forEach((item: any) => {
            if (COIN_LIST.includes(item.symbol)) {
                const fieldName: string = item.symbol;
                result[fieldName] = item.quote.USD.price;
            }
        })
        return result;
    }

    async getCurrencies() {
        return await axios.get(COINMARKETCAP_API, {
            headers: {
                "X-CMC_PRO_API_KEY": APIKEY,
            },
        });
    }
}

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