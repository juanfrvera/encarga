import {MigrationInterface, QueryRunner} from "typeorm";

export class renamedItemProperties1638470774030 implements MigrationInterface {
    name = 'renamedItemProperties1638470774030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME "titulo" to "name"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME "precio" to "price"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME "descripcion" to "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME "name" to "titulo"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME "price" to "precio"`);
        await queryRunner.query(`ALTER TABLE "item" RENAME "description" to "descripcion"`);
    }

}
