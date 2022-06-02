import {EntityCoin} from "../entity/EntityCoin";
import {CoinMarketCap} from "../classes/CoinMarketCap";
import {CoinBase} from "../classes/CoinBase";
import {CoinStats} from "../classes/CoinStats";
import {Kucoin} from "../classes/Kucoin";
import {CoinPaprika} from "../classes/CoinPaprika";
import {COIN_LIST} from "../constants/constants";
import AppDataSource from "../data-source";

const refreshCurrencies = async () => {
    const coinMarketCapRes = await new CoinMarketCap().refreshCurrency();
    const coinBase = await new CoinBase().refreshCurrency();
    const coinStats = await new CoinStats().refreshCurrency();
    const kucoin = await new Kucoin().refreshCurrency();
    const coinPaprika = await new CoinPaprika().refreshCurrency();
    COIN_LIST.forEach((item: any) => {
        saveInDb(item,
            coinMarketCapRes[item],
            coinBase[item],
            coinStats[item],
            kucoin[item],
            coinPaprika[item]
        )
    })
}

const saveInDb = async (coin: string, coin_market_cap: number, coin_base: number, coin_paprika: number, coin_stats: number, kucoin: number) => {
    console.log("Inserting new into the database...")
    const entity = new EntityCoin()
    entity.coin = coin
    entity.coin_market_cap = coin_market_cap
    entity.coin_base = coin_base
    entity.coin_paprika = coin_paprika
    entity.coin_stats = coin_stats
    entity.kucoin = kucoin
    entity.time = new Date()
    await AppDataSource.manager.save(EntityCoin, entity)
}

export {
    refreshCurrencies,
    saveInDb,
}
