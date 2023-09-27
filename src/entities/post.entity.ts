import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { Comment } from "./comment.entity";
import { User } from "./user.entity";

@Entity()
export class Post{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: Date

  @Column({unique: true})
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({nullable: true})
  image: string;

  @Column({default: 0})
  views: number;

  @Column()
  categorySlug: string;

  @Column()
  username: string;

  @ManyToOne(()=> Category, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'categorySlug', referencedColumnName: 'slug'})
  category: Category

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]
  
  @ManyToOne(() => User, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  user: User
}