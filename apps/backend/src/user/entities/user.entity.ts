import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"
import { Path } from "../../paths/entities/path.entity"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    username: string

    @Column(
        {
            nullable: false,
        }
    )
    nickname: string

    @Column(
        {
            nullable: true,
        }
    )
    password: string

    @Column(
        {
            nullable: true,
        }
    )
    role: "admin" | "user"

    @Column(
        {
            nullable: true,
            default: "Незнайка"
        }
    )
    rank: string

    @Column(
        {
            nullable: true,
        }
    )
    refreshToken: string

    @Column(
        {
            nullable: true,
            default: 0
        }
    )
    score: number

    @Column(
        {
            nullable: true,
        }
    )
    ratingPlacement: number

    @Column(
        {
            nullable: false,
            default: false
        }
    )
    isAnalyzed: boolean
    
    @Column
    (
        {
            nullable: true
        }
    )
    grade: "8" | "9" | "10" | "11" 
    
    @Column
    (
        {
            nullable: true,
            default: 0
        }
    )
    points: number

    @Column
    (
        {
            nullable: true,
        }
    )
    avataruri: string

    //IMAGES FOR USERS

    @OneToMany(() => SocialUsers, (social) => social.user)
    @JoinTable()
    socials: SocialUsers[]

    @OneToMany(() => OwnedPath, (path) => path.user)
    @JoinTable()
    paths: OwnedPath[]

    @OneToMany(() => AchievementOwned, (achievement) => achievement.user)
    @JoinColumn()
    achievements: AchievementOwned[]
}
