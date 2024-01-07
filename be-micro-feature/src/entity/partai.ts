import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { paslon } from "./paslon"

@Entity()
export class partai {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    chairman: string

    @Column()
    visionAndMission: string

    @Column()
    address: string

    @Column({ nullable: true })
    picture: string

    @ManyToOne(() => paslon, (paslon) => paslon.partai)
    paslon: paslon
}
