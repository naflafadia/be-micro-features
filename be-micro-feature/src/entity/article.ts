import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { user } from "./user"

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

    @Column({ nullable: true })
    picture: string

    @ManyToOne(() => user, (user) => user.article)
    user: user
}
