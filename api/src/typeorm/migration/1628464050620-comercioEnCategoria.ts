import {MigrationInterface, QueryRunner} from "typeorm";

export class comercioEnCategoria1628464050620 implements MigrationInterface {
    name = 'comercioEnCategoria1628464050620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comercio" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, CONSTRAINT "UQ_565d8036547e9fbce99576d8b75" UNIQUE ("url"), CONSTRAINT "PK_be959b0894edbf4f730530ee736" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "comercioId" integer`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD CONSTRAINT "FK_bb78fc35353b85041cba32c3ec9" FOREIGN KEY ("comercioId") REFERENCES "comercio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria" DROP CONSTRAINT "FK_bb78fc35353b85041cba32c3ec9"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "comercioId"`);
        await queryRunner.query(`DROP TABLE "comercio"`);
    }

}
