import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
import { Path } from "../../paths/entities/path.entity";
@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false
        }
    )
    title: string

    @Column(
        {
            nullable: false,
            default: "event"
        }
    )
    status: string

    @CreateDateColumn()
    date: string

    @ManyToMany(() => User, (user) => user.cards)
    @JoinTable()
    author: User 

    @ManyToMany(() => Path, (path) => path.cards)
    @JoinTable()
    path?: Path 
}
