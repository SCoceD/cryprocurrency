import {DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER} from "./constants/constants";
import {DataSource} from "typeorm";
import {EntityCoin} from "./entity/EntityCoin";
import {EntityFavorites} from "./entity/EntityFavorites";

const AppDataSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: true,
    logging: false,
    entities: [EntityCoin, EntityFavorites],
    migrations: [],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export default  AppDataSource
