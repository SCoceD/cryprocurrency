import axios from "axios";
import {COIN_LIST, KUCOIN} from "../constants/constants";

export class Kucoin implements RefreshCurrency {
    async refreshCurrency() {
        const response = await this.getCurrencies();
        const result: any = {};
        for (const [key, value] of Object.entries(response.data.data)) {
            if (COIN_LIST.includes(key)) {
                // @ts-ignore
                result[key] = +value;
            }
        }
        return result;
    }

    getCurrencies() {
        return axios(KUCOIN);
    }
}
