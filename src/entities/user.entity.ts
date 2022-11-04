import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User_Questions } from "./user_question.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 70, unique: true })
  email: string;

  @Column({ length: 10 })
  stack: string;

  @Column({ length: 150 })
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column("integer", { default: 0 })
  score: number;

  @OneToMany(() => User_Questions, (userQuestions) => userQuestions.user)
  user_questions: User_Questions[];
}
