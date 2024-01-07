import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1704459611668 implements MigrationInterface {
    name = 'MyMigration1704459611668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "author" character varying NOT NULL, "title" character varying NOT NULL, "date" date NOT NULL, "description" character varying NOT NULL, "picture" character varying, "userId" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying NOT NULL, "address" character varying, "username" character varying, "gender" character varying, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "userId" integer, "paslonId" integer, CONSTRAINT "REL_f5de237a438d298031d11a57c3" UNIQUE ("userId"), CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "no" integer NOT NULL, "name" character varying NOT NULL, "visionAndMission" character varying NOT NULL, "picture" character varying, CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "chairman" character varying NOT NULL, "visionAndMission" character varying NOT NULL, "address" character varying NOT NULL, "picture" character varying, "paslonId" integer, CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_636f17dadfea1ffb4a412296a28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_261e520454f44e8bd073952992e" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partai" ADD CONSTRAINT "FK_6e81e0a136eec2e38810173f217" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "partai" DROP CONSTRAINT "FK_6e81e0a136eec2e38810173f217"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_261e520454f44e8bd073952992e"`);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`);
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_636f17dadfea1ffb4a412296a28"`);
        await queryRunner.query(`DROP TABLE "partai"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "vote"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
