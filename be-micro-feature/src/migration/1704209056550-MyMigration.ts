import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704209056550 implements MigrationInterface {
    name = 'MyMigration1704209056550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "no" integer NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "accumulation" integer NOT NULL, "numberOfVotes" integer NOT NULL, "gender" character varying NOT NULL, "paslon" character varying NOT NULL, "picture" character varying, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
