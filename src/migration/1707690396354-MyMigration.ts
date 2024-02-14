import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1707690396354 implements MigrationInterface {
    name = 'MyMigration1707690396354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photo_profile" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "photo_profile" SET NOT NULL`);
    }

}
