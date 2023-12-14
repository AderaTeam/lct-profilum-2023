import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable } from "typeorm"
import { User } from "../../database/entities-index"

@Entity()
export class Path {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    @JoinTable()
    user: User
}
