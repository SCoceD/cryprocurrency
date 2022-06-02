import express, {Express} from 'express';
import {PORT} from "./constants/constants";
import {router} from "./router/router"
import {refreshCurrencies} from "./service/refreshCurrencies";

const cron = require('node-cron');

const app: Express = express();
app.use(router)

cron.schedule('*/5 * * * *', () => {
    refreshCurrencies().then(r => console.log('running a task every 5 minute')).catch(err =>
        console.error("error in refreshCurrencies", err)
    );
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
