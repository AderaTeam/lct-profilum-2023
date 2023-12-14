import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "../../database/entities-index"

@Entity()
export class Path {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}
