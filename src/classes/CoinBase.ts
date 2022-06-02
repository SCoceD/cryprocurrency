import axios from "axios";
import {COIN_BASE_API, COIN_LIST} from "../constants/constants";

export class CoinBase implements RefreshCurrency {

    async refreshCurrency() {
        const response = await this.getCurrencies()
        const result: any = {};
        for (const item in response.data.data.rates) {
            if (COIN_LIST.includes(item)){
                result[item] = 1 / response.data.data.rates[item];
            }
        }
        return result;
    }

    async getCurrencies() {
        return await axios.get(COIN_BASE_API);
    }
}
