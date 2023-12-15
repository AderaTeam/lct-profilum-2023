import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, PrimaryColumn } from "typeorm"
import { User } from "../../database/entities-index"
import { Path } from "./path.entity"

@Entity()
export class OwnedPath {

    @PrimaryGeneratedColumn()
    id: number

    @PrimaryColumn()
    @ManyToOne(() => Path, {eager: true})
    @JoinTable()
    path: Path

    @PrimaryColumn()
    @ManyToOne(() => User)
    @JoinTable()
    user: User

    @Column(
        {
            nullable: false,
            default: 1
        }
    )
    currentStep: number
}
