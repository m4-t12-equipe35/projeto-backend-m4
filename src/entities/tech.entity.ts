import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity("techs")
export class Tech {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70, nullable: false, unique: true })
  name: string;

  @Column({ length: 10, nullable: false })
  stack: string;

}

