import { MigrationInterface, QueryRunner } from "typeorm";

export class questionsUpdate1667448761804 implements MigrationInterface {
    name = 'questionsUpdate1667448761804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "techId" uuid`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_b990c925cdad84d7ba0b614a9a4" FOREIGN KEY ("techId") REFERENCES "techs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_b990c925cdad84d7ba0b614a9a4"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "techId"`);
    }

}
