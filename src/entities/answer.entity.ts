import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Questions } from "./question.entity";

@Entity("answers")
export class Answers {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 150 })
  answer: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Questions)
  question: Questions;
}