import AppDataSource from "../data-source";
import {EntityCoin} from "../entity/EntityCoin";

export const listRecent = async (param: string) => {
    const entities = await AppDataSource.manager.find(EntityCoin, {
        order: {
            id: 'DESC'
        },
        take: 20
    });
    let result = '';

    entities.forEach((item: EntityCoin, index: number) => {
            result += `/${item.coin} $` + (item.coin_market_cap + item.coin_base + item.coin_stats + item.kucoin + item.coin_paprika) / 5 + '\n';
        }
    );
    return (result);
}
