import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704072062553 implements MigrationInterface {
    name = 'MyMigration1704072062553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "no" integer NOT NULL, "name" character varying NOT NULL, "visionAndMission" character varying NOT NULL, "coalition" character varying NOT NULL, "picture" character varying, CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "picture" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article" ALTER COLUMN "picture" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "paslon"`);
    }

}
