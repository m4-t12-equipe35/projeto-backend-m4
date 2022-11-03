import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667504973053 implements MigrationInterface {
    name = 'createTables1667504973053'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isAnswered" boolean NOT NULL DEFAULT false, "isRight" boolean NOT NULL, CONSTRAINT "PK_57bcdfc90c43f8b16813b7687a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "techs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "stack" character varying(10) NOT NULL, CONSTRAINT "UQ_d1382ecb058091a0f8fc89c5abc" UNIQUE ("name"), CONSTRAINT "PK_8ab2729ee26c5893090fb7b1b2b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" character varying(200) NOT NULL, "level" character varying(20) NOT NULL, "techId" uuid, CONSTRAINT "UQ_7ef689c4d85706f2ca92366dc0b" UNIQUE ("question"), CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" character varying(150) NOT NULL, "isCorrect" boolean NOT NULL, "questionId" uuid, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "email" character varying(70) NOT NULL, "stack" character varying(10) NOT NULL, "password" character varying(150) NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL, "score" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_b990c925cdad84d7ba0b614a9a4" FOREIGN KEY ("techId") REFERENCES "techs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_b990c925cdad84d7ba0b614a9a4"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "techs"`);
        await queryRunner.query(`DROP TABLE "user_questions"`);
    }

}
