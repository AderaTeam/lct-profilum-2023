import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable } from "typeorm"
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

    @ManyToOne(() => User)
    @JoinTable()
    user: User
}
