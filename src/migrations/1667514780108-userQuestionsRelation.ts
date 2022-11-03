import { MigrationInterface, QueryRunner } from "typeorm";

export class userQuestionsRelation1667514780108 implements MigrationInterface {
    name = 'userQuestionsRelation1667514780108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_questions" ADD "questionsId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user_questions" ADD CONSTRAINT "FK_deacc1171dfcde80e88c6d659e4" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_questions" DROP CONSTRAINT "FK_deacc1171dfcde80e88c6d659e4"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "isActive" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user_questions" DROP COLUMN "questionsId"`);
    }

}
