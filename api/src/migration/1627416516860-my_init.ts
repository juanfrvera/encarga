import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1627416516860 implements MigrationInterface {
    name = 'myInit1627416516860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item_categoria" ("id" SERIAL NOT NULL, "orden" integer NOT NULL, "itemId" integer, "categoriaId" integer, CONSTRAINT "PK_716638e0eae6b3b37566876938b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "precio" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "descripcion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_fb37da56a34fa92693a78737b53" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "item_categoria" ADD CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_b576277dd4d45f8b8d8f2209c8d"`);
        await queryRunner.query(`ALTER TABLE "item_categoria" DROP CONSTRAINT "FK_fb37da56a34fa92693a78737b53"`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "descripcion" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "precio" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "item_categoria"`);
    }

}
