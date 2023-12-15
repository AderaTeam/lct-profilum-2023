import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {

        }
    )
    title: string
}
