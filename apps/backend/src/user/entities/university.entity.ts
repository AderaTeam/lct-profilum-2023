import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"
import { Path } from "../../paths/entities/path.entity"
import { Card } from "../../community/entities/card.entity"

@Entity()
export class Univercity {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @Column(
        {
            nullable: false,
        }
    )
    city: string

    @Column(
        {
            nullable: false,
        }
    )
    popularity: string

    @Column(
        {
            nullable: false,
        }
    )
    students: number

    @Column(
        {
            nullable: false,
        }
    )
    budgetPlaces: boolean

    // @Column(
    //     {
    //         nullable: false,
    //         array: true,
    //     }
    // )
    // tags: string[]

    @Column(
        {
            nullable: false,
        }
    )
    image: string

    @Column(
        {
            nullable: false,
            select: false
        }
    )
    imageBuff: string
}