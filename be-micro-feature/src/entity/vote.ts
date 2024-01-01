import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class vote {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int" })
    no: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ type: "int" })
    accumulation: number;

    @Column({ type: "int" })
    numberOfVotes: number;

    @Column()
    gender: string;

    @Column()
    paslon: string;

    @Column({ nullable: true })
    picture: string;
}
