import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class EntityFavorites {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: 'tinytext'})
    coin!: string;

    @Column({type: 'boolean'})
    InFlowing!: boolean
}
