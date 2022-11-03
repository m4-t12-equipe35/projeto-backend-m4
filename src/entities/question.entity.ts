import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Answers } from "./answer.entity";
import { Tech } from "./tech.entity";


@Entity("questions")
export class Questions {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 200, unique: true })
  question: string;

  @Column({ length: 20 })
  level: string;

  @ManyToOne(() => Tech)
  tech: Tech;

  @OneToMany(() => Answers, answers => answers.question)
  answers: Answers[]
}