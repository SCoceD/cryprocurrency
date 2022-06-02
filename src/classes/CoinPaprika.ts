import axios from "axios";
import {COIN_LIST, COIN_PAPRIKA} from "../constants/constants";

export class CoinPaprika implements RefreshCurrency {
    async refreshCurrency() {
        const response = await this.getCurrencies()
        const result: any = {};
        response.data.forEach((item: any) => {
            if (COIN_LIST.includes(item.symbol)) {
                result[item.symbol] = item.quotes.USD.price;
            }
        });
        return result;
    }

    getCurrencies() {
        return axios(COIN_PAPRIKA);
    }
}