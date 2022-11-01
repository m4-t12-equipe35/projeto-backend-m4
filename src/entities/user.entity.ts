import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
  password: string;

  @Column()
  isAdm: boolean;

  @Column("integer", { default: 0 })
  score: number;
}
