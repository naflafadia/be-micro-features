import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    no: number

    @Column()
    chairman: string

    @Column()
    visionAndMission: string

    @Column()
    address: string

    @Column({ nullable: true })
    picture: string

}
