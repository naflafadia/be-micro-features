import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm"
import { vote } from "./vote"
import { article } from "./article"

export type UserRoleType = "admin" | "editor" | "ghost"
@Entity({ name: "user" })
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  gender: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: ["admin", "editor", "ghost"],
    default: "ghost",
})
role: UserRoleType

  @OneToOne(() => vote, (vote) => vote.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  vote: vote

  @OneToMany(() => article, (article) => article.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  article: article[]
}