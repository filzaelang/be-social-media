import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1708324863298 implements MigrationInterface {
    name = 'MyMigration1708324863298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
    }

}
