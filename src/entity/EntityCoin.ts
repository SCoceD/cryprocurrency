import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class EntityCoin {

    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: 'tinytext'})
    coin!: string;

    @Column({type: 'double'})
    coin_market_cap!: number

    @Column({type: 'double'})
    coin_base!: number

    @Column({type: 'double'})
    coin_stats!: number

    @Column({type: 'double'})
    kucoin!: number

    @Column({type: 'double'})
    coin_paprika!: number

    @Column({type: 'datetime'})
        // @ts-ignore
    time: Date
}
