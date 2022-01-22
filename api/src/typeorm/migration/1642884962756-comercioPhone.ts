import {MigrationInterface, QueryRunner} from "typeorm";

export class comercioPhone1642884962756 implements MigrationInterface {
    name = 'comercioPhone1642884962756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comercio" DROP COLUMN "phone"`);
    }

}
