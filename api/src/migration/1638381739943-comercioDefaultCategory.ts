import {MigrationInterface, QueryRunner} from "typeorm";

export class comercioDefaultCategory1638381739943 implements MigrationInterface {
    name = 'comercioDefaultCategory1638381739943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "FK_052aa3cfd49741c7d0d6ef70589"`);
        await queryRunner.query(`ALTER TABLE "comercio" RENAME COLUMN "categoriaDefectoId" TO "categoriaDefaultId"`);
        await queryRunner.query(`ALTER TABLE "comercio" RENAME CONSTRAINT "UQ_052aa3cfd49741c7d0d6ef70589" TO "UQ_c18ddf599d7b0d7c0ae3201d887"`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" DROP CONSTRAINT "PK_5ff8dbf8d592ba4602bb2b9afff"`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" ADD CONSTRAINT "PK_f1b084e1c2f0cef7995d56c82a5" PRIMARY KEY ("comercioId", "usuarioId", "id")`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "PK_aa1814203c446ce50b8ae12c533"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "PK_60373d9f45b57fe6d71f070a587" PRIMARY KEY ("itemId", "categoriaId", "id")`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "FK_c18ddf599d7b0d7c0ae3201d887" FOREIGN KEY ("categoriaDefaultId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "FK_c18ddf599d7b0d7c0ae3201d887"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "PK_60373d9f45b57fe6d71f070a587"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "PK_aa1814203c446ce50b8ae12c533" PRIMARY KEY ("itemId", "categoriaId")`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" DROP CONSTRAINT "PK_f1b084e1c2f0cef7995d56c82a5"`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" ADD CONSTRAINT "PK_5ff8dbf8d592ba4602bb2b9afff" PRIMARY KEY ("comercioId", "usuarioId")`);
        await queryRunner.query(`ALTER TABLE "usuario_comercio" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comercio" RENAME CONSTRAINT "UQ_c18ddf599d7b0d7c0ae3201d887" TO "UQ_052aa3cfd49741c7d0d6ef70589"`);
        await queryRunner.query(`ALTER TABLE "comercio" RENAME COLUMN "categoriaDefaultId" TO "categoriaDefectoId"`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "FK_052aa3cfd49741c7d0d6ef70589" FOREIGN KEY ("categoriaDefectoId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
