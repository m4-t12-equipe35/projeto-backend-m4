import { MigrationInterface, QueryRunner } from "typeorm";

export class techsMigration1667415008854 implements MigrationInterface {
    name = 'techsMigration1667415008854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isAnswered" boolean NOT NULL DEFAULT false, "isRight" boolean NOT NULL, "userId" uuid, CONSTRAINT "PK_57bcdfc90c43f8b16813b7687a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "stack" character varying(10) NOT NULL, CONSTRAINT "UQ_d1382ecb058091a0f8fc89c5abc" UNIQUE ("name"), CONSTRAINT "PK_8ab2729ee26c5893090fb7b1b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_questions" ADD CONSTRAINT "FK_328a3fb6489de0ab543b0360ddb" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_questions" DROP CONSTRAINT "FK_328a3fb6489de0ab543b0360ddb"`);
        await queryRunner.query(`DROP TABLE "techs"`);
        await queryRunner.query(`DROP TABLE "user_questions"`);
    }

}
