import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1707990058801 implements MigrationInterface {
    name = 'MyMigration1707990058801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL`);
    }

}
