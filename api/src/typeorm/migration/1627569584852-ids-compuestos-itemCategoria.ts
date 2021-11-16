import {MigrationInterface, QueryRunner} from "typeorm";

export class idsCompuestosItemCategoria1627569584852 implements MigrationInterface {
    name = 'idsCompuestosItemCategoria1627569584852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "PK_716638e0eae6b3b37566876938b"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "PK_aa1814203c446ce50b8ae12c533" PRIMARY KEY ("itemId", "categoriaId")`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_fb37da56a34fa92693a78737b53"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ALTER COLUMN "itemId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ALTER COLUMN "categoriaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_fb37da56a34fa92693a78737b53" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_fb37da56a34fa92693a78737b53"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ALTER COLUMN "categoriaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ALTER COLUMN "itemId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_fb37da56a34fa92693a78737b53" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "PK_aa1814203c446ce50b8ae12c533"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "PK_716638e0eae6b3b37566876938b" PRIMARY KEY ("id")`);
    }

}
