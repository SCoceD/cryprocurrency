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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const refreshCurrencies_1 = require("../service/refreshCurrencies");
const getListRecent_1 = require("../service/getListRecent");
const getWithSymbol_1 = require("../service/getWithSymbol");
const constants_1 = require("../constants/constants");
const favoriteStatus_1 = require("../service/favoriteStatus");
exports.router = (0, express_1.Router)();
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, refreshCurrencies_1.refreshCurrencies)();
        res.send('The sedulous hyena ate the antelope!');
    }
    catch (e) {
        console.log(e);
    }
}));
exports.router.get('/listRecent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('call listRecent');
    try {
        const result = yield (0, getListRecent_1.listRecent)('');
        res.send(result);
    }
    catch (e) {
        console.log(e);
    }
}));
exports.router.get('/coinInfo/:coinName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('call coin info');
    if (constants_1.COIN_LIST.includes(req.params.coinName)) {
        const result = yield (0, getWithSymbol_1.getCoinInfo)(req.params.coinName);
        res.send(result);
    }
    else {
        res.send('Bad request. Use /help for info about command.');
    }
}));
exports.router.get('/favorite/:coinName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('call coin favorite');
    if (constants_1.COIN_LIST.includes(req.params.coinName)) {
        yield (0, favoriteStatus_1.changeFavoriteStatus)(req.params.coinName);
    }
    else {
        res.send('Bad request. Use /help for info about command.');
    }
}));
