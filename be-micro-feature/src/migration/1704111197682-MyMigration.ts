import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704111197682 implements MigrationInterface {
    name = 'MyMigration1704111197682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "no" integer NOT NULL, "chairman" character varying NOT NULL, "visionAndMission" character varying NOT NULL, "address" character varying NOT NULL, "picture" character varying, CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "partai"`);
    }

}
