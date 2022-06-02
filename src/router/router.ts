import {Router} from "express";
import {refreshCurrencies} from "../service/refreshCurrencies";
import {listRecent} from "../service/getListRecent";
import {getCoinInfo} from "../service/getWithSymbol";
import {COIN_LIST} from "../constants/constants";
import {changeFavoriteStatus} from "../service/favoriteStatus";

export const router = Router();

router.get('/', async (req: any, res: any) => {
    try {
        refreshCurrencies();
        res.send('The sedulous hyena ate the antelope!');
    } catch (e) {
        console.log(e);
    }
});

router.get('/listRecent', async (req: any, res: any) => {
    console.log('call listRecent')
    try {
        const result = await listRecent('');
        res.send(result);
    } catch (e) {
        console.log(e);
    }
});

router.get('/coinInfo/:coinName', async (req, res) => {
    console.log('call coin info')
    if (COIN_LIST.includes(req.params.coinName)) {
        const result = await getCoinInfo(req.params.coinName);
        res.send(result);
    } else {
        res.send('Bad request. Use /help for info about command.')
    }
})

router.get('/favorite/:coinName', async (req, res) => {
    console.log('call coin favorite')
    if (COIN_LIST.includes(req.params.coinName)) {
        await changeFavoriteStatus(req.params.coinName);
    } else {
        res.send('Bad request. Use /help for info about command.')
    }
})
