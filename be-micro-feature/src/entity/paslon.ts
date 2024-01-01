import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class paslon {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "int" })
    no: number

    @Column()
    name: string

    @Column()
    visionAndMission: string

    @Column()
    coalition: string

    @Column({ nullable: true })
    picture: string
}
