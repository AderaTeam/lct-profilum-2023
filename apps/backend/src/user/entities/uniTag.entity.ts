import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany, BeforeInsert, BeforeUpdate } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"
import { Path } from "../../paths/entities/path.entity"
import { Card } from "../../community/entities/card.entity"
import { Univercity } from "./university.entity"

@Entity()
export class UniTag {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @ManyToMany(() => Univercity, (uni) => uni.tags)
    @JoinTable()
    universities: Univercity
}
