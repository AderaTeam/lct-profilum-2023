import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SocialUsers } from "./socialsUsers.entity";

@Entity()
export class Social {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false
        }
    )
    name: string

    @Column(
        {
            nullable: false
        }
    )
    description: string

    @OneToMany(() => SocialUsers, (socialUsers) => socialUsers.social, {cascade: true})
    @JoinColumn()
    social: SocialUsers
}
