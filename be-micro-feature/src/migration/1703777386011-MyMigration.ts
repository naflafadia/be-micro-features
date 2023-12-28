import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1703777386011 implements MigrationInterface {
    name = 'MyMigration1703777386011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "picture" character varying NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
