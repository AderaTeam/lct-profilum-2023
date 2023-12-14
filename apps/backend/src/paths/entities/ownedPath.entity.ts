import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable } from "typeorm"
import { User } from "../../database/entities-index"
import { Path } from "./path.entity"

@Entity()
export class OwnedPath {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Path)
    @JoinTable()
    path: Path

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
