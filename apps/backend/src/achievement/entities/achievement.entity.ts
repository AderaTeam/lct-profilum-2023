import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Achievement {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
            
        }
    )
    name: string

    @Column(
        { 
            type: "bytea", 
            nullable: false,
        }
    )
    image: Buffer
}
