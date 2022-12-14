import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Questions } from "./question.entity";

@Entity("techs")
export class Tech {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70, nullable: false, unique: true })
  name: string;

  @Column({ length: 10, nullable: false })
  stack: string;

  @OneToMany(() => Questions, (question) => question.tech)
  questions: Questions[];
}
