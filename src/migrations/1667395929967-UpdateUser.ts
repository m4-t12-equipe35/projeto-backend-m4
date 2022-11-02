import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1667395929967 implements MigrationInterface {
    name = 'UpdateUser1667395929967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(70) NOT NULL, "stack" character varying(10) NOT NULL, "password" character varying(150) NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL, "score" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
