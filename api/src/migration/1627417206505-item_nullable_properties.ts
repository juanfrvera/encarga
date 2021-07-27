import {MigrationInterface, QueryRunner} from "typeorm";

export class itemNullableProperties1627417206505 implements MigrationInterface {
    name = 'itemNullableProperties1627417206505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "precio" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "descripcion" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "descripcion" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "item" ALTER COLUMN "precio" SET NOT NULL`);
    }

}
