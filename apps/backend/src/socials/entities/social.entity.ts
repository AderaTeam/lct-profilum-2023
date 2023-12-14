import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
