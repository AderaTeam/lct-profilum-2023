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
            default: []
        }
    )
    paths: [number]

    @OneToMany(() => AchievementOwned, (achievement) => achievement.user)
    @JoinColumn()
    achievements: AchievementOwned[]
}
