import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
import { Social } from "./social.entity";

@Entity()
export class SocialUsers {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false
        }
    )
    originaluserid: string

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Social)
    @JoinColumn()
    social: Social


}
