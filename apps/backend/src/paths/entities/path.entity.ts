import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, JoinColumn, ManyToMany } from "typeorm"
import { PathStep } from "./pathStep.entity"
import { User } from "../../database/entities-index"

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

    @ManyToMany(() => User, (user) => {user.analyzedPaths})
    @JoinTable()
    users: User[]

    @OneToMany(() => PathStep, (pathstep) => pathstep.path, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    pathSteps: PathStep[]
}
