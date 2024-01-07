import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm"
import { vote } from "./vote"
import { article } from "./article"

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

  @Column({ default: "user" })
  role: string;

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