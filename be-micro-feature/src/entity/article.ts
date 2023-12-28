import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class article {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    author: string

    @Column()
    title: string

    @Column("date")
    date: string

    @Column()
    description: string

    @Column()
    picture: string

}
