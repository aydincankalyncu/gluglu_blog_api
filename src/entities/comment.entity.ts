import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Comment{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  createdAt: Date
  
  @Column()
  description: string;

  @Column()
  postSlug: string;

  @Column()
  username: string;

  @ManyToOne(() => Post, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'postSlug', referencedColumnName: 'slug'})
  post: Post

  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  user: User
}