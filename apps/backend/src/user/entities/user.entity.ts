import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"

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
    password: string

    @Column(
        {
            nullable: true,
        }
    )
    role: string

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
    
    
    //grade string 8 | 9 | 10 | 11
    //points

    @OneToMany(() => AchievementOwned, (achievement) => achievement.user)
    @JoinColumn()
    achievements: AchievementOwned[]
}
