import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704591342997 implements MigrationInterface {
    name = 'MyMigration1704591342997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }

}
