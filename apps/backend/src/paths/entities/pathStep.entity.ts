import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinTable, ManyToMany } from "typeorm"
import { Path } from "./path.entity"
import { PathTag } from "./pathTag.entity"
import { PathStepContent } from "./pathStepContent.entity"

@Entity()
export class PathStep {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    step: number

    @Column(
        {
            nullable: false,
        }
    )
    title: string

    @Column(
        {
            nullable: false,
        }
    )
    points: number

    @ManyToMany(() => PathTag, (pathTag) => pathTag.pathSteps)
    @JoinTable()
    tags: PathTag[]

    @OneToOne(() => PathStepContent)
    @JoinTable()
    content: PathStepContent   

    @ManyToOne(() => Path)
    @JoinTable()
    path: Path
}