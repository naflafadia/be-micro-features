import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn,} from "typeorm"
import { paslon } from "./paslon"
import { user } from "./user"

@Entity()
export class vote {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => user, (user) => user.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    @JoinColumn()
    user : user

    @ManyToOne(() => paslon , (paslon) => paslon.vote, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    paslon : paslon
}