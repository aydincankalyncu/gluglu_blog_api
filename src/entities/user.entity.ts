import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column({unique: true})
  email: string;

  @Column({default: 0})
  isAdmin: number

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}