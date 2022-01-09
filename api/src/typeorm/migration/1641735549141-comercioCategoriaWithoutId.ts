import {MigrationInterface, QueryRunner} from "typeorm";

export class comercioCategoriaWithoutId1641735549141 implements MigrationInterface {
    name = 'comercioCategoriaWithoutId1641735549141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio_categoria" DROP CONSTRAINT "PK_875e71a82154e9f04acca0a72c4"`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" ADD CONSTRAINT "PK_6d27e9eb19c72d7f3f815144039" PRIMARY KEY ("comercioId", "categoriaId")`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" DROP COLUMN "id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio_categoria" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" DROP CONSTRAINT "PK_6d27e9eb19c72d7f3f815144039"`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" ADD CONSTRAINT "PK_875e71a82154e9f04acca0a72c4" PRIMARY KEY ("id", "comercioId", "categoriaId")`);
    }

}
