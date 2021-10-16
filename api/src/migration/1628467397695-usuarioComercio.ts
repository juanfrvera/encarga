import {MigrationInterface, QueryRunner} from "typeorm";

export class usuarioComercio1628467397695 implements MigrationInterface {
    name = 'usuarioComercio1628467397695'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "mail" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_01da70386c62a55c6b242670c4f" UNIQUE ("mail"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario_comercio" ("comercioId" integer NOT NULL, "usuarioId" integer NOT NULL, CONSTRAINT "PK_5ff8dbf8d592ba4602bb2b9afff" PRIMARY KEY ("comercioId", "usuarioId"))`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" ADD CONSTRAINT "FK_ee30a96a23a6580d759b45c5432" FOREIGN KEY ("comercioId") REFERENCES "comercio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" ADD CONSTRAINT "FK_863b45e6f2bf701bf567d49b587" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_comercio" DROP CONSTRAINT "FK_863b45e6f2bf701bf567d49b587"`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" DROP CONSTRAINT "FK_ee30a96a23a6580d759b45c5432"`);
        await queryRunner.query(`DROP TABLE "usuario_comercio"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
