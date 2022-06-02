import axios from "axios";
import {COIN_LIST, COIN_STATS_API} from "../constants/constants";

export class CoinStats implements RefreshCurrency {
    async refreshCurrency() {
        const response = await this.getCurrencies();
        const result: any = {};
        response.data.coins.forEach((item: any) => {
            if (COIN_LIST.includes(item.symbol)) {
                result[item.symbol] = item.price;
            }
        });
        return result;
    }

    getCurrencies() {
        return axios.get(COIN_STATS_API, {
            params: {
                limit: 50,
            },
        });
    }
}