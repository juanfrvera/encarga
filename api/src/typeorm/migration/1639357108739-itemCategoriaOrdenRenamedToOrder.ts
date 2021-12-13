import {MigrationInterface, QueryRunner} from "typeorm";

export class itemCategoriaOrdenRenamedToOrder1639357108739 implements MigrationInterface {
    name = 'itemCategoriaOrdenRenamedToOrder1639357108739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categoria" RENAME COLUMN "orden" TO "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item_categoria" RENAME COLUMN "order" TO "orden"`);
    }

}
