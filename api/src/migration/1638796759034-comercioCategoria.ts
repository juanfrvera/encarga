import {MigrationInterface, QueryRunner} from "typeorm";

export class comercioCategoria1638796759034 implements MigrationInterface {
    name = 'comercioCategoria1638796759034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "FK_c18ddf599d7b0d7c0ae3201d887"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP CONSTRAINT "FK_bb78fc35353b85041cba32c3ec9"`);
        await queryRunner.query(`CREATE TABLE "comercio_categoria" ("id" SERIAL NOT NULL, "isDefault" boolean NOT NULL, "comercioId" integer NOT NULL, "categoriaId" integer NOT NULL, CONSTRAINT "PK_875e71a82154e9f04acca0a72c4" PRIMARY KEY ("id", "comercioId", "categoriaId"))`);
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "UQ_c18ddf599d7b0d7c0ae3201d887"`);
        await queryRunner.query(`ALTER TABLE "comercio" DROP COLUMN "categoriaDefaultId"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "comercioId"`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" ADD CONSTRAINT "FK_dbc4331bef998a8b2c3bec92b90" FOREIGN KEY ("comercioId") REFERENCES "comercio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" ADD CONSTRAINT "FK_85128be30ff17b11764171c2077" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio_categoria" DROP CONSTRAINT "FK_85128be30ff17b11764171c2077"`);
        await queryRunner.query(`ALTER TABLE "comercio_categoria" DROP CONSTRAINT "FK_dbc4331bef998a8b2c3bec92b90"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "comercioId" integer`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD "categoriaDefaultId" integer`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "UQ_c18ddf599d7b0d7c0ae3201d887" UNIQUE ("categoriaDefaultId")`);
        await queryRunner.query(`DROP TABLE "comercio_categoria"`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD CONSTRAINT "FK_bb78fc35353b85041cba32c3ec9" FOREIGN KEY ("comercioId") REFERENCES "comercio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "FK_c18ddf599d7b0d7c0ae3201d887" FOREIGN KEY ("categoriaDefaultId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
