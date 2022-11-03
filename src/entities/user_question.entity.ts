import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity("user_questions")
export class User_Questions {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ default: false })
  isAnswered: boolean;

  @Column()
  isRight: boolean;

  // @ManyToOne(() => Questions)
  // questions: Questions

  //   @ManyToOne(() => User, { eager: true })
  //   user: User;
}
