import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany } from "typeorm"
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

    @OneToMany(() => PathStep, (pathstep) => pathstep.path, {onDelete: 'CASCADE'})
    @JoinTable()
    pathSteps: PathStep[]
}
