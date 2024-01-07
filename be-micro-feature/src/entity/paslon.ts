import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { vote } from "./vote"
import { partai } from './partai';


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

    @Column({ nullable: true })
    picture: string

    @OneToMany(() => vote, (vote) => vote.paslon, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    vote: vote

    @OneToMany(() => partai, (partai) => partai.paslon, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    partai: partai[]
}
