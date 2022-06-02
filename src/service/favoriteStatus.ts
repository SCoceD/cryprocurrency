import AppDataSource from "../data-source";
import {EntityFavorites} from "../entity/EntityFavorites";

export const changeFavoriteStatus = async (coinName: string) => {
    console.log("Change status in the database...")
    try {
        const entityRepo = AppDataSource.getRepository(EntityFavorites)
        const coinToUpdate = await entityRepo.findOneBy({
            coin: coinName,
        })
        if (coinToUpdate !== null) {
            coinToUpdate.InFlowing = !coinToUpdate.InFlowing;
            await entityRepo.save(coinToUpdate);
        } else {
            new Error();
        }
    } catch (e) {
        console.log(e);
    }
}

