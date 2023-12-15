import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, JoinColumn } from "typeorm"
import { PathStep } from "./pathStep.entity"

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

    @OneToMany(() => PathStep, (pathstep) => pathstep.path, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    pathSteps: PathStep[]
}
