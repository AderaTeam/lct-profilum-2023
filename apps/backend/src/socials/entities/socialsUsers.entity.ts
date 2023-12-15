import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
import { Social } from "./social.entity";

@Entity()
export class SocialUsers {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            unique: true,
            nullable: false
        }
    )
    originaluserid: string

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn()
    user: User

    @ManyToOne(() => Social, {cascade: true})
    @JoinColumn()
    social: Social


}
