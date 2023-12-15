import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, JoinColumn } from "typeorm"
import { PathStep } from "./pathStep.entity"

@Entity()
export class PathTag {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @ManyToMany(() => PathStep, (pathstep) => pathstep.tags)
    @JoinTable()
    pathSteps: PathStep[]
}
