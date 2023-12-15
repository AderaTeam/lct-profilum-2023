import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, JoinColumn, ManyToMany } from "typeorm"
import { PathStep } from "./pathStep.entity"
import { User } from "../../database/entities-index"
import { Card } from "../../community/entities/card.entity"

@Entity()
export class Path {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @ManyToMany(() => User, (user) => {user.analysedPaths})
    @JoinTable()
    users: User[]

    @ManyToMany(() => Card, (card) => {card.path})
    @JoinTable()
    cards: Card[]

    @OneToMany(() => PathStep, (pathstep) => pathstep.path, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    pathSteps: PathStep[]
}
