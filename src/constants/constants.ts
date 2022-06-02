const PORT = 3000;
const APIKEY = "9268fff0-2853-444a-850c-a9253e4642c6";
const COINMARKETCAP_API = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
const COIN_BASE_API = "https://api.coinbase.com/v2/exchange-rates?currency=USD";
const COIN_STATS_API = "https://api.coinstats.app/public/v1/coins?skip=0&limit=5&currency=USD"
const KUCOIN = "https://api.kucoin.com/api/v1/prices";
const COIN_PAPRIKA = "https://api.coinpaprika.com/v1/tickers";
const NUMBER_OF_SOURCES_PRICE_INFO = 5;
const DB_USER = "root";
const DB_PASS = "password";
const DB_HOST = "localhost";
const DB_NAME = "cryptocurrency";
const DB_PORT = 3306;
const COIN_LIST = ['BTC', 'ETH', 'USDT', 'USDC', 'BCH', 'ZEC', 'APE', 'ADA', 'SOL', 'DOGE', 'DOT', 'WBTC', 'AVAX', 'ETC', 'DAI', 'SHIB', 'MATIC', 'MANA', 'CRO', 'LTC']
const REFRESH_TIME = 5;
const TIME_PERIODS_INFO_MINUTES = [30, 60, 180, 360, 720, 1440];

export {
    PORT,
    APIKEY,
    COINMARKETCAP_API,
    COIN_BASE_API,
    COIN_STATS_API,
    KUCOIN,
    COIN_PAPRIKA,
    NUMBER_OF_SOURCES_PRICE_INFO,
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_NAME,
    DB_PORT,
    COIN_LIST,
    REFRESH_TIME,
    TIME_PERIODS_INFO_MINUTES,
};
