import AppDataSource from "../data-source";
import {EntityCoin} from "../entity/EntityCoin";
import {REFRESH_TIME, TIME_PERIODS_INFO_MINUTES} from "../constants/constants";
import {EntityFavorites} from "../entity/EntityFavorites";

export const getCoinInfo = async (param: string) => {
    let result = `/${param} : `;
    let arrPromises: any = [];
    TIME_PERIODS_INFO_MINUTES.forEach((time: any) => {
        arrPromises.push(getCoinInfoForInterval(param, time));
    });
    await Promise.all(arrPromises)
        .then(arr => {
            arr.forEach((item: number, index: number) => {
                const timeInHour = TIME_PERIODS_INFO_MINUTES[index] < 60
                    ? `${TIME_PERIODS_INFO_MINUTES[index]}m`
                    : TIME_PERIODS_INFO_MINUTES[index] / 60 + 'h';
                result += `For ${timeInHour} - ` + item + '\n';
            })
        })
    const resDbFavorite = await AppDataSource.manager.findOne(EntityFavorites, {
        where: {
            coin: `${param}`,
        }
    })
    const inFavorite = resDbFavorite === null ? false : resDbFavorite.InFlowing;
    return [result, inFavorite];
}

const getCoinInfoForInterval = async (param: string, minutes: number) => {
    const timePeriod = minutes / REFRESH_TIME;
    let result = 0;
    const resDB = await AppDataSource.manager.find(EntityCoin, {
        where: {
            coin: `${param}`,
        },
        order: {
            id: 'DESC',
        },
        take: timePeriod,
    });
    resDB.forEach((item: any) => {
        result += (item.coin_market_cap + item.coin_base + item.coin_stats + item.kucoin + item.coin_paprika) / 5;
    })
    return result / timePeriod;
}

