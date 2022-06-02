interface RefreshCurrency{
    refreshCurrency: () => Promise<any>;
    getCurrencies: () => Promise<any>;
}