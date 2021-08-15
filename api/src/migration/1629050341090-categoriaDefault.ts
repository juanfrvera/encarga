import {MigrationInterface, QueryRunner} from "typeorm";

export class categoriaDefault1629050341090 implements MigrationInterface {
    name = 'categoriaDefault1629050341090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" ADD "categoriaDefectoId" integer`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "UQ_052aa3cfd49741c7d0d6ef70589" UNIQUE ("categoriaDefectoId")`);
        await queryRunner.query(`ALTER TABLE "comercio" ADD CONSTRAINT "FK_052aa3cfd49741c7d0d6ef70589" FOREIGN KEY ("categoriaDefectoId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "FK_052aa3cfd49741c7d0d6ef70589"`);
        await queryRunner.query(`ALTER TABLE "comercio" DROP CONSTRAINT "UQ_052aa3cfd49741c7d0d6ef70589"`);
        await queryRunner.query(`ALTER TABLE "comercio" DROP COLUMN "categoriaDefectoId"`);
    }

}
